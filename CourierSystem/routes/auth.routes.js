const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/login', authController.login);                                  // Public: get a token
router.get('/me', protect(), authController.me);                              // Any logged-in user
router.post('/change-password', protect(), authController.changePassword);    // Any logged-in user

module.exports = router;
