const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');
const { rateLimit, emailOf } = require('../utils/rateLimit');

const FIFTEEN_MINUTES = 15 * 60 * 1000;

// Slows down password guessing: 10 tries per 15 minutes for the same email from the same address.
const loginLimiter = rateLimit({
    windowMs: FIFTEEN_MINUTES, max: 10,
    keyFn: (req) => `${req.ip}|${emailOf(req)}`,
    message: 'Too many login attempts. Please try again in a few minutes.'
});

// Stops anyone from flooding a person's inbox (per email) or our mail server (per address).
const forgotPerIp = rateLimit({
    windowMs: FIFTEEN_MINUTES, max: 10,
    keyFn: (req) => req.ip,
    message: 'Too many requests. Please try again later.'
});
const forgotPerEmail = rateLimit({
    windowMs: FIFTEEN_MINUTES, max: 3,
    keyFn: emailOf,
    message: 'Too many reset requests for this email. Please try again later.'
});

// Slows down guessing of reset tokens.
const resetLimiter = rateLimit({
    windowMs: FIFTEEN_MINUTES, max: 10,
    keyFn: (req) => req.ip,
    message: 'Too many attempts. Please try again later.'
});

router.post('/login', loginLimiter, authController.login);                                  // Public: log in (sets the cookie)
router.post('/logout', authController.logout);                                              // Public: log out (clears the cookie)
router.get('/me', protect(), authController.me);                                            // Any logged-in user
router.post('/forgot-password', forgotPerIp, forgotPerEmail, authController.forgotPassword); // Public: email me a reset link
router.post('/reset-password', resetLimiter, authController.resetPassword);                 // Public: set a new password with the emailed token

module.exports = router;