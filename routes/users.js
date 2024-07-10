const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Register Route
router.post('/register', userController.register);

// Login Route
router.post('/login', userController.login);

module.exports = router;

