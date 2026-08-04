// routes/bookRequestRoutes.js
const express = require('express');
const router = express.Router();
const { createBookRequest } = require('../requestBooks/bookReqController');
// backend/src/requestBooks/bookReqRoutes.js
const requireAuth = require('../middleware/auth');
router.post('/create', requireAuth, createBookRequest);

module.exports = router;
