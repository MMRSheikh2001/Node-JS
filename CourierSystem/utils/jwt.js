const jwt = require('jsonwebtoken');

// The only algorithm we sign with AND accept. Pinning it on verify blocks the
// classic trick of sending a token whose header claims "alg: none" (unsigned).
const ALGORITHM = 'HS256';

// The secret comes from .env, never from the code. Whoever knows it can
// create tokens for any user, including an admin, so it has to be long and
// private.
function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error(
            'JWT_SECRET is missing or too short (it needs at least 32 characters).\n' +
            'Add a line like JWT_SECRET=<long random text> to CourierSystem/.env.\n' +
            'You can generate one with:\n' +
            '  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'hex\'))"'
        );
    }
    return secret;
}

// Called once when the server starts, so a missing secret stops the server
// immediately with a clear message instead of failing on the first login.
function assertJwtConfigured() {
    getSecret();
}

// The token holds just the user's id (as "sub") and a role hint. On every
// request the server looks the user up again, so the database stays the
// source of truth: a deactivated user or a changed role takes effect at once.
function signToken(user) {
    return jwt.sign({ role: user.role }, getSecret(), {
        algorithm: ALGORITHM,
        subject: String(user.id),
        expiresIn: process.env.JWT_EXPIRES_IN || '1d' // e.g. '30m', '12h', '7d'
    });
}

// Throws if the token is forged, tampered with, or expired.
function verifyToken(token) {
    return jwt.verify(token, getSecret(), { algorithms: [ALGORITHM] });
}

module.exports = { assertJwtConfigured, signToken, verifyToken };
