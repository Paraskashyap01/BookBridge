const express = require('express');
const router = express.Router();
const notificationController = require('../notification/notificationController');

// backend/src/notification/notificationRoutes.js
const requireAuth = require('../middleware/auth');
router.post('/', requireAuth, notificationController.createNotificationHandler);
router.get('/', requireAuth, notificationController.getDonorNotifications);
router.get('/requester/:requesterId', requireAuth, notificationController.getRequesterNotifications);
router.patch('/:id', requireAuth, notificationController.updateNotificationStatus);
router.get('/request-counts', requireAuth, notificationController.getRequestCounts);


module.exports = router;
