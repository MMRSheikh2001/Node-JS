const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const Customer = require('../models/customer.model');
const Rider = require('../models/rider.model');
const Agent = require('../models/agent.model');
const PoliceStation = require('../models/police-station.model');
const { signToken } = require('../utils/jwt');
const { HttpError, badRequest, forbidden } = require('../utils/httpError');

const SALT_ROUNDS = 10;
const MIN_PASSWORD_LENGTH = 6;

// A real bcrypt hash of a throwaway string. When someone logs in with an
// email that doesn't exist we still run bcrypt against this, so "unknown
// email" takes as long as "wrong password" and an attacker can't use the
// response time to discover which emails are registered.
const DUMMY_HASH = bcrypt.hashSync('not-a-real-password', SALT_ROUNDS);

// "Who is this user, in terms the rest of the app needs?" Besides the user
// row it finds the profile id: a customer's Customer.id, a rider's Rider.id,
// an agent's Agent.id (plus their hub). Controllers use profileId to check
// "is this parcel/record really theirs?".
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

    // Always compare, even when the user doesn't exist (see DUMMY_HASH), and
    // use ONE message for both failures so the response never says which part
    // was wrong.
    const passwordMatches = await bcrypt.compare(password, user ? user.password : DUMMY_HASH);
    if (!user || !passwordMatches) {
        throw new HttpError(401, 'Invalid email or password.');
    }
    if (!user.active) {
        throw forbidden('This account is deactivated.');
    }

    const principal = await getPrincipal(user);

    return {
        token: signToken(user),
        tokenType: 'Bearer',
        userId: principal.id,
        name: principal.name,
        email: principal.email,
        phone: principal.phone,
        role: principal.role,
        profileId: principal.profileId ?? undefined, // Customer/Rider/Agent id, omitted for ADMIN
        hubId: principal.hubId ?? undefined,         // agents only
        hubName: principal.hubName ?? undefined      // agents only
    };
}

async function changePassword(userId, { currentPassword, newPassword }) {
    if (typeof currentPassword !== 'string' || typeof newPassword !== 'string' || !currentPassword || !newPassword) {
        throw badRequest('currentPassword and newPassword are required.');
    }
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
        throw badRequest(`newPassword must be at least ${MIN_PASSWORD_LENGTH} characters.`);
    }

    const user = await User.findByPk(userId);
    if (!user || !(await bcrypt.compare(currentPassword, user.password))) {
        // 400, not 401/403: the person IS logged in, so clients shouldn't treat
        // this as "your session is invalid and you must log in again".
        throw badRequest('Current password is incorrect.');
    }
    if (currentPassword === newPassword) {
        throw badRequest('The new password must be different from the current one.');
    }

    await user.update({ password: await bcrypt.hash(newPassword, SALT_ROUNDS) });
}

// Creating the very first admin. Registering an admin through the API would
// need an admin to already exist, so the first one comes from .env:
// ADMIN_EMAIL + ADMIN_PASSWORD (optionally ADMIN_NAME, ADMIN_PHONE).
// Does nothing once any admin exists.
async function seedAdmin() {
    if (await User.findOne({ where: { role: 'ADMIN' } })) return;

    const { ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME, ADMIN_PHONE } = process.env;
    if (!ADMIN_EMAIL || !ADMIN_PASSWORD) {
        console.warn('No admin account exists yet. Add ADMIN_EMAIL and ADMIN_PASSWORD to .env and restart to create one.');
        return;
    }

    // A short value usually means .env cut the password off early: in a .env
    // file an unquoted # starts a comment, so ADMIN_PASSWORD=Pass#123 is read
    // as just "Pass". Refuse rather than create an admin with a weak password.
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

module.exports = { getPrincipal, login, changePassword, seedAdmin };
