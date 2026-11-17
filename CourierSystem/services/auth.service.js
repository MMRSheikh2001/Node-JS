const crypto = require('crypto');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const Rider = require('../models/rider.model');
const Agent = require('../models/agent.model');
const PoliceStation = require('../models/police-station.model');
const AuthSession = require('../models/auth-session.model');
const PasswordResetToken = require('../models/password-reset-token.model');
const { signToken, getExpiry } = require('../utils/jwt');
const { HttpError, badRequest, forbidden } = require('../utils/httpError');
const { sendMail } = require('../utils/mailer');

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 6;



// A real bcrypt hash of a throwaway string. When someone logs in with an email
// that doesn't exist we still run bcrypt against this, so "unknown email" takes
// as long as "wrong password" and the response time can't reveal which emails exist.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', SALT_ROUNDS);

// "Who is this user, in terms the rest of the app needs?" Besides the user row,
// it finds the profile id: a customer's Customer.id, a rider's Rider.id, an
// agent's Agent.id (plus their hub).
async function getPrincipal(user) {
    const principal = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        profileId: null,
        hubId: null,
        hubName: null
    };

    if (user.role === 'CUSTOMER') {
        const customer = await Customer.findOne({ where: { userId: user.id }, attributes: ['id'] });
        principal.profileId = customer ? customer.id : null;
    } else if (user.role === 'RIDER') {
        const rider = await Rider.findOne({ where: { userId: user.id }, attributes: ['id'] });
        principal.profileId = rider ? rider.id : null;
    } else if (user.role === 'AGENT') {
        const agent = await Agent.findOne({
            where: { userId: user.id },
            include: [{ model: PoliceStation, as: 'hub' }]
        });
        if (agent) {
            principal.profileId = agent.id;
            principal.hubId = agent.hubId;
            principal.hubName = agent.hub ? agent.hub.name : null;
        }
    }

    return principal;
}

async function login({ email, password }) {
    if (typeof email !== 'string' || typeof password !== 'string' || !email.trim() || !password) {
        throw badRequest('email and password are required.');
    }

    const user = await User.findOne({ where: { email: email.trim() } });

    // Always compare (see DUMMY_HASH) and use ONE message for both failures,
    // so the response never says which part was wrong.
    const passwordMatches = await bcrypt.compare(password, user ? user.password : DUMMY_HASH);
    if (!user || !passwordMatches) {
        throw new HttpError(401, 'Invalid email or password.');
    }
    if (!user.active) {
        throw forbidden('This account is deactivated.');
    }

    const principal = await getPrincipal(user);

    // One row per login. The token carries this row's id, so deleting the row
    // (logout, password reset) ends that login even though the token hasn't expired.
    const sessionId = crypto.randomUUID();
    const token = signToken(user, sessionId);
    const expiresAt = getExpiry(token);
    await AuthSession.create({ id: sessionId, userId: user.id, expiresAt });

    // Housekeeping: forget this user's logins that have already expired.
    await AuthSession.destroy({ where: { userId: user.id, expiresAt: { [Op.lt]: new Date() } } });

    return {
        token,      // goes into the cookie, NOT into the response body
        expiresAt,
        user: {
            userId: principal.id,
            name: principal.name,
            email: principal.email,
            phone: principal.phone,
            role: principal.role,
            profileId: principal.profileId ?? undefined, // Customer/Rider/Agent id, left out for ADMIN
            hubId: principal.hubId ?? undefined,         // agents only
            hubName: principal.hubName ?? undefined      // agents only
        }
    };
}

// Ends ONE login (the "logout" button).
async function logout(sessionId) {
    await AuthSession.destroy({ where: { id: sessionId } });
}

// Is this login still alive? Checked on every request.
async function findActiveSession(sessionId, userId) {
    return AuthSession.findOne({
        where: { id: sessionId, userId, expiresAt: { [Op.gt]: new Date() } }
    });
}

// Ends EVERY login of a user (used when their password is reset).
async function revokeAllSessions(userId) {
    await AuthSession.destroy({ where: { userId } });
}

// Forgot password / reset password

// How long a reset link stays valid (RESET_TOKEN_MINUTES in .env, default 30).
const resetTokenMinutes = () => Number(process.env.RESET_TOKEN_MINUTES) || 30;

// What the front end should open when the person clicks the link in the email.
function resetLink(token) {
    const base = process.env.CLIENT_URL || (process.env.CLIENT_ORIGINS || 'http://localhost:4200').split(',')[0].trim();
    return `${base.replace(/\/$/, '')}/reset-password?token=${token}`;
}

// The database keeps only a hash of the token (see PasswordResetToken).
const hashToken = (token) => crypto.createHash('sha256').update(token).digest('hex');

const escapeHtml = (text) => String(text).replace(/[&<>"']/g,
    (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Step 1: the person says "I forgot my password" and gives their email.
// This function never tells the caller whether the email exists, so the form
// can't be used to find out who has an account.
async function requestPasswordReset(email) {
    if (typeof email !== 'string' || !email.trim()) {
        throw badRequest('email is required.');
    }

    // Housekeeping: links that have expired are useless, so remove them.
    await PasswordResetToken.destroy({ where: { expiresAt: { [Op.lt]: new Date() } } });

    const user = await User.findOne({ where: { email: email.trim() } });
    if (!user || !user.active) return; // unknown or deactivated: do nothing, say nothing

    // One live link per person: a new request cancels the previous link.
    await PasswordResetToken.destroy({ where: { userId: user.id } });

    const token = crypto.randomBytes(32).toString('hex'); // 256 random bits, can't be guessed
    const minutes = resetTokenMinutes();
    await PasswordResetToken.create({
        userId: user.id,
        tokenHash: hashToken(token),
        expiresAt: new Date(Date.now() + minutes * 60 * 1000)
    });

    const link = resetLink(token);

    // NOT awaited, on purpose. Sending email is slow; waiting for it would make
    // "this email exists" take visibly longer than "it doesn't", and that
    // difference would reveal which addresses are registered. A failure is
    // logged (never thrown, so it can't crash the server or change the answer).
    sendMail({
        to: user.email,
        subject: 'Reset your password',
        text:
            `Hello ${user.name},\n\n` +
            `We received a request to reset your password. Open this link to choose a new one:\n\n` +
            `${link}\n\n` +
            `The link works once and expires in ${minutes} minutes. If you did not ask for this, ` +
            `you can ignore this email and your password will stay the same.`,
        html:
            `<p>Hello ${escapeHtml(user.name)},</p>` +
            `<p>We received a request to reset your password. Click the link below to choose a new one:</p>` +
            `<p><a href="${link}">Reset my password</a></p>` +
            `<p>The link works once and expires in ${minutes} minutes. If you did not ask for this, ` +
            `you can ignore this email and your password will stay the same.</p>`
    }).catch((error) => console.error(`Could not send the password reset email: ${error.message}`));
}

// Step 2: the person opens the emailed link, types a new password, and the
// front end sends us the token from the link plus that password.
async function resetPassword({ token, newPassword }) {
    if (typeof token !== 'string' || !token.trim() || typeof newPassword !== 'string' || !newPassword) {
        throw badRequest('token and newPassword are required.');
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
        throw badRequest(`newPassword must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }

    // One message for every way a link can be bad (wrong, expired, already used).
    const invalidLink = () => badRequest('This reset link is invalid or has expired. Please request a new one.');

    const record = await PasswordResetToken.findOne({
        where: { tokenHash: hashToken(token.trim()), expiresAt: { [Op.gt]: new Date() } }
    });
    if (!record) throw invalidLink();

    const user = await User.findByPk(record.userId);
    if (!user || !user.active) throw invalidLink();

    const passwordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

    // All three changes happen together or not at all.
    await sequelize.transaction(async (t) => {
        await user.update({ password: passwordHash }, { transaction: t });
        await PasswordResetToken.destroy({ where: { userId: user.id }, transaction: t }); // the link works only once
        await AuthSession.destroy({ where: { userId: user.id }, transaction: t });        // sign out on every device
    });
}


// Creates the very first admin from .env, because registering an admin through
// the API would need an admin to already exist. Does nothing once any admin exists.
async function seedAdmin() {
    if (await User.findOne({ where: { role: 'ADMIN' } })) return;

    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_PHONE } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.warn('No admin account exists yet. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env and restart to create one.');
        return;
    }

    // A short value usually means .env cut the password off early: in a .env file
    // an unquoted # starts a comment, so ADMIN_PASSWORD=Pass#123 is read as "Pass".
    if (ADMIN_PASSWORD.length < 8) {
        console.warn('ADMIN_PASSWORD must be at least 8 characters, so no admin was created. ' +
            'If your password contains a #, wrap it in quotes in .env, e.g. ADMIN_PASSWORD="Pass#1234".');
        return;
    }

    try {
        await User.create({
            name: ADMIN_NAME || 'Administrator',
            email: ADMIN_EMAIL,
            phone: ADMIN_PHONE || '01000000000',
            password: await bcrypt.hash(ADMIN_PASSWORD, SALT_ROUNDS),
            role: 'ADMIN'
        });
        console.log(`Admin account created for ${ADMIN_EMAIL}.`);
    } catch (error) {
        // e.g. that email or phone already belongs to another user
        console.warn(`Could not create the admin account: ${error.message}`);
    }
}

module.exports = {
    getPrincipal, login, logout, findActiveSession, revokeAllSessions,
    requestPasswordReset, resetPassword, seedAdmin
};