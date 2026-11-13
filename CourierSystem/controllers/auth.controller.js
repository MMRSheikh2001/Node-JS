const authService = require('../services/auth.service');
const { sendError } = require('../utils/httpError');

// POST /api/auth/login   body: { email, password }
exports.login = async (req, res) => {
    try {
        const result = await authService.login(req.body || {});
        return res.status(200).json(result);
    } catch (error) {
        return sendError(res, error, 'Error logging in');
    }
};