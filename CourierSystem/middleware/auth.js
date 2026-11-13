const User = require('../models/user.model');
const { verifyToken } = require('../utils/jwt');
const { getPrincipal } = require('../services/auth.service');
const { HttpError, forbidden, sendError } = require('../utils/httpError');

// ──────────────────────────────────────────────────────────────
// 1. AUTHENTICATE: "who are you?"
//    Reads  Authorization: Bearer <token>,  checks the token, loads the
//    user from the database, and puts them on req.user for the next
//    middleware / controller. Answers 401 if it can't tell who you are.
// ──────────────────────────────────────────────────────────────
async function authenticate(req, res, next) {
    try {
        const [scheme, token] = (req.headers.authorization || '').split(' ');
        if (!/^Bearer$/i.test(scheme) || !token) {
            throw new HttpError(401, 'Login required. Send the header: Authorization: Bearer <token>');
        }

        let payload;
        try {
            payload = verifyToken(token);
        } catch (error) {
            throw new HttpError(401, error.name === 'TokenExpiredError'
                ? 'Your session has expired. Please log in again.'
                : 'Invalid token.');
        }

        // Look the user up on EVERY request instead of trusting the token alone.
        // That way a deleted or deactivated account stops working immediately,
        // not only when its token finally expires.
        const user = await User.findByPk(payload.sub);
        if (!user) throw new HttpError(401, 'This account no longer exists.');
        if (!user.active) throw forbidden('This account is deactivated.');

        req.user = await getPrincipal(user); // { id, role, profileId, hubId, ... }
        return next();
    } catch (error) {
        return sendError(res, error, 'Authentication error');
    }
}

// ──────────────────────────────────────────────────────────────
// 2. ALLOW ROLES: "are you the right kind of user?"  (403 if not)
//    Runs AFTER authenticate, so req.user exists.
// ──────────────────────────────────────────────────────────────
function allowRoles(...roles) {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Your role (${req.user.role}) is not allowed to do this.` });
        }
        return next();
    };
}

// protect('ADMIN', 'AGENT')  -> must be logged in AND be one of those roles
// protect()                  -> must be logged in, any role
// Returns a list of two middlewares; Express accepts that in a route.
function protect(...roles) {
    return roles.length > 0 ? [authenticate, allowRoles(...roles)] : [authenticate];
}

// protectOrSelf(['ADMIN'], { role: 'CUSTOMER', param: 'id', field: 'profileId' })
//   -> admins may always pass; a CUSTOMER may pass only when the :id in the URL
//      is their OWN profile id. Anyone else gets 403.
//   `field` says what to compare the URL value against:
//      'profileId' = the Customer/Rider/Agent id,  'id' = the User id.
function protectOrSelf(roles, self) {
    return [
        authenticate,
        (req, res, next) => {
            const user = req.user;
            if (roles.includes(user.role)) return next();

            const mine = user[self.field];
            if (user.role === self.role && mine != null && String(req.params[self.param]) === String(mine)) {
                return next();
            }
            return res.status(403).json({ message: 'You can only access your own records.' });
        }
    ];
}

// ──────────────────────────────────────────────────────────────
// 3. OWN PROFILE ID: "act as yourself, never as someone else"
//    Some endpoints used to take customerId / riderId / agentId from the
//    client and trust it. Now the logged-in user's real id is used. If the
//    client still sends one, it must be their own (otherwise 403); if it
//    sends none, their own is filled in.
//    Throws an HttpError; controllers pass it to sendError().
// ──────────────────────────────────────────────────────────────
function ownProfileId(req, provided, label) {
    const own = req.user.profileId;
    if (own == null) {
        throw forbidden(`Your account has no ${label} profile.`);
    }
    const supplied = provided !== undefined && provided !== null && provided !== '';
    if (supplied && String(provided) !== String(own)) {
        throw forbidden(`You can only act as yourself (${label} ${own}).`);
    }
    return own;
}

// For resources that anyone may READ but only an admin may CHANGE
// (the geography tables). Mounted once in server.js instead of repeating
// a guard on every route.
function readPublicWriteAdmin(req, res, next) {
    if (req.method === 'GET' || req.method === 'HEAD') return next();
    return authenticate(req, res, () => allowRoles('ADMIN')(req, res, next));
}

module.exports = { authenticate, allowRoles, protect, protectOrSelf, ownProfileId, readPublicWriteAdmin };
