const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Auth with Google
router.get('/google', authController.googleAuth);

// Google auth callback
router.get('/google/callback', authController.googleCallback, authController.googleCallbackSuccess);

// Logout
router.get('/logout', authController.logout);

module.exports = router;
