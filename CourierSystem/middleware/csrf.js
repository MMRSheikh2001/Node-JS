const { COOKIE_NAME } = require('../utils/cookies');

const SAFE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);

// CSRF = another website tricking your browser into sending a request to this
// API with your login cookie attached. SameSite already blocks most of it; this
// is a second lock. For requests that CHANGE data and carry the login cookie,
// the browser's "Origin" header must be one of our own front ends.
// Postman/curl send no Origin header and no browser cookies, so they are unaffected.
function csrfGuard(allowedOrigins) {
    return (req, res, next) => {
        if (SAFE_METHODS.has(req.method)) return next();
        if (!req.cookies || !req.cookies[COOKIE_NAME]) return next();

        const origin = req.headers.origin;
        if (origin && !allowedOrigins.includes(origin)) {
            return res.status(403).json({ message: 'Request blocked: untrusted origin.' });
        }
        return next();
    };
}

module.exports = { csrfGuard };