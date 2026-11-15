const COOKIE_NAME = 'token';

// The settings that make the cookie safe:
//   httpOnly -> JavaScript on the page can NOT read it, so a script injected by
//               an attacker (XSS) can't steal the login.
//   secure   -> only sent over HTTPS (switched on when NODE_ENV=production).
//   sameSite -> the browser won't attach it to requests started by OTHER sites,
//               which is the main defence against CSRF.
function cookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: (process.env.COOKIE_SAMESITE || 'lax').toLowerCase(),
        path: '/'
    };
}

function setAuthCookie(res, token, expiresAt) {
    res.cookie(COOKIE_NAME, token, { ...cookieOptions(), expires: expiresAt });
}

// To delete a cookie the browser must be told the same name, path and flags it was created with.
function clearAuthCookie(res) {
    res.clearCookie(COOKIE_NAME, cookieOptions());
}

// Browsers send the cookie by themselves. The Authorization header is still
// accepted as a fallback for tools like Postman or scripts.
function readToken(req) {
    if (req.cookies && req.cookies[COOKIE_NAME]) {
        return req.cookies[COOKIE_NAME];
    }
    const [scheme, token] = (req.headers.authorization || '').split(' ');
    return /^Bearer$/i.test(scheme) && token ? token : null;
}

module.exports = { COOKIE_NAME, setAuthCookie, clearAuthCookie, readToken };