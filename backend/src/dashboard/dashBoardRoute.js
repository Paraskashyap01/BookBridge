const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('./dashBoardController');

// backend/src/dashboard/dashBoardRoute.js
const requireAuth = require('../middleware/auth');
router.get('/stats', requireAuth, getDashboardStats);

module.exports = router;
