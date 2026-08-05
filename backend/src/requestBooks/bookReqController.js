// controllers/bookRequestController.js
const BookRequest = require('./bookReqModel');
const mongoose = require('mongoose');
const Donation = require('../donate/donateModel');
const { createNotification } = require('../notification/notificationController');  // Import the createNotification function

// Handle the creation of a book request and a notification
exports.createBookRequest = async (req, res) => {
  try {
    const { bookId, requesterEmail } = req.body;
    const requesterId = req.user.uid; // requester must be authenticated

    const donation = await Donation.findById(bookId);
    if (!donation) {
      return res.status(404).json({ error: 'Book not found' });
    }

    if (donation.donorId !== req.user.uid && donation.status !== 'Available') {
      return res.status(400).json({ error: 'Book is not available for request' });
    }

    if (donation.donorId === requesterId) {
      return res.status(403).json({ error: 'You cannot request your own book' });
    }

    const donorId = donation.donorId;

    const newRequest = await BookRequest.create({
      bookId: new mongoose.Types.ObjectId(bookId),
      donorId,
      requesterId,
      requesterEmail,
    });

    await createNotification({
      donorId,
      requesterId,
      bookId: new mongoose.Types.ObjectId(bookId),
    });

    res.status(201).json(newRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};