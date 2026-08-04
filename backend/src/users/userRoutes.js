const express = require('express');
const {registerUser, getUserById} = require('./userController');

const router = express.Router();

// POST /api/users
const requireAuth = require('../middleware/auth');
router.post('/register', requireAuth, registerUser);
router.get('/register/:uid', requireAuth, getUserById);

module.exports = router;
