const jwt = require('jsonwebtoken');

const ALGORITHM = 'HS256';

function getSecret() {
    const secret = process.env.JWT_SECRET;
    if (!secret || secret.length < 32) {
        throw new Error(
            'JWT_SECRET is missing or too short (it needs at least 32 characters).\n' +
            'Add a line like JWT_SECRET=<long random text> to CourierSystem/.env.'
        );
    }
    return secret;
}

// Called once at startup so a missing secret stops the server immediately.
function assertJwtConfigured() {
    getSecret();
}


// Creates a signed token that holds the user's id (as "sub"), their role, and
// the id of the login session it belongs to (as "jti"). The session row in the
// database is what lets us end a login early (logout, password reset).
function signToken(user, sessionId) {
    return jwt.sign({ role: user.role }, getSecret(), {
        algorithm: ALGORITHM,
        subject: String(user.id),
        jwtid: sessionId,
        expiresIn: process.env.JWT_EXPIRES_IN || '1d'
    });
}

// When does this token expire? Returns a Date, read from the token's "exp" claim.
function getExpiry(token) {
    return new Date(jwt.decode(token).exp * 1000);
}

// Throws if the token is forged, tampered with, or expired.
function verifyToken(token) {
    return jwt.verify(token, getSecret(), { algorithms: [ALGORITHM] });
}

module.exports = { assertJwtConfigured, signToken, verifyToken, getExpiry };