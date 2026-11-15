const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth');

router.post('/login', authController.login);       // Public: log in (sets the cookie)
router.post('/logout', authController.logout);     // Public: log out (clears the cookie)
router.get('/me', protect(), authController.me);   // Any logged-in user

module.exports = router;