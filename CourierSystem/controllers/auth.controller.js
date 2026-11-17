const authService = require('../services/auth.service');
const { verifyToken } = require('../utils/jwt');
const { setAuthCookie, clearAuthCookie, readToken } = require('../utils/cookies');
const { sendError } = require('../utils/httpError');

// POST /api/auth/login   body: { email, password }
// The token goes into an httpOnly cookie. The response body carries only who
// you are, never the token, so JavaScript on the page can't get hold of it.
exports.login = async (req, res) => {
    try {
        const { token, expiresAt, user } = await authService.login(req.body || {});
        setAuthCookie(res, token, expiresAt);
        return res.status(200).json(user);
    } catch (error) {
        return sendError(res, error, 'Error logging in');
    }
};

// POST /api/auth/forgot-password   body: { email }
// Always gives the same answer, whether or not the email is registered, so this
// form can't be used to discover who has an account.
exports.forgotPassword = async (req, res) => {
    try {
        await authService.requestPasswordReset((req.body || {}).email);
        return res.status(200).json({ message: 'If that email is registered, a reset link has been sent.' });
    } catch (error) {
        return sendError(res, error, 'Error requesting a password reset');
    }
};

// POST /api/auth/reset-password   body: { token, newPassword }
// token = the long text from the emailed link. On success every login of this
// person is ended; the browser's own cookie is cleared too, and they log in again.
exports.resetPassword = async (req, res) => {
    try {
        await authService.resetPassword(req.body || {});
        clearAuthCookie(res);
        return res.status(200).json({ message: 'Your password has been reset. Please log in with the new one.' });
    } catch (error) {
        return sendError(res, error, 'Error resetting the password');
    }
};

// POST /api/auth/logout
// Deletes this login's session row (so the token is dead even if someone
// copied it) and tells the browser to drop the cookie. Always answers 200,
// even if you were already logged out or the token had expired.
exports.logout = async (req, res) => {
    try {
        const token = readToken(req);
        if (token) {
            try {
                const payload = verifyToken(token);
                if (payload.jti) await authService.logout(payload.jti);
            } catch (ignored) {
                // expired or invalid token: there is nothing to end
            }
        }
        clearAuthCookie(res);
        return res.status(200).json({ message: 'Logged out.' });
    } catch (error) {
        return sendError(res, error, 'Error logging out');
    }
};

// GET /api/auth/me   (needs a login)
// "Who does the server think I am?" A front end calls this when the page loads
// to find out whether the browser still has a valid login.
exports.me = (req, res) => {
    const { id, name, email, phone, role, profileId, hubId, hubName } = req.user;
    return res.status(200).json({
        userId: id,
        name,
        email,
        phone,
        role,
        profileId: profileId ?? undefined,
        hubId: hubId ?? undefined,
        hubName: hubName ?? undefined
    });
};