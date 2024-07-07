const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to register a new user
router.post('/register', authController.register);

// Route to authenticate a user and get a token
router.post('/login', authController.login);

module.exports = router;
