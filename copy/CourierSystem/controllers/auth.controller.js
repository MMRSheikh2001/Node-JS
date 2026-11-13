const authService = require('../services/auth.service');
const { sendError } = require('../utils/httpError');

// POST /api/auth/login   body: { email, password }
// Returns the token plus who you are, so a front end can store both at once.
exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body || {});
        return res.status(200).json(result);
    } catch (error) {
        return sendError(res, error, 'Error logging in');
    }
};

// GET /api/auth/me   (needs a token)
// "Who does the server think I am?" Handy for front ends and for debugging.
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

// POST /api/auth/change-password   body: { currentPassword, newPassword }
exports.changePassword = async (req, res) => {
    try {
        await authService.changePassword(req.user.id, req.body || {});
        return res.status(200).json({ message: 'Password changed successfully.' });
    } catch (error) {
        return sendError(res, error, 'Error changing password');
    }
};
