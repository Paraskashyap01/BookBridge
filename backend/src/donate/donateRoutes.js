const express = require('express');
const multer = require('multer');
const router = express.Router();
const { createDonation, getDonationCount, getDonationDates } = require('./donateController');

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const ok = ['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype);
    cb(ok ? null : new Error('Only jpg/png/webp images allowed'), ok);
  },
});

// backend/src/donate/donateRoutes.js
const requireAuth = require('../middleware/auth');
router.post('/donate', requireAuth, upload.single('image'), createDonation);
// Routes
router.get('/count', requireAuth, getDonationCount);
router.get('/donation-dates', requireAuth, getDonationDates);


module.exports = router;