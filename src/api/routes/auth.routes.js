const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middleware/auth.middleware');

// User signup
router.post('/signup', authController.signup);
// User login
router.post('/login', authController.login);
// Logout
router.post('/logout', authMiddleware, authController.logout);
// Get current user info
router.get('/me', authMiddleware, authController.getMe);

module.exports = router; 