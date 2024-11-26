const express = require('express');
const { createBooking, getUserBookings, updateBooking, deleteBooking } = require('../controllers/bookingController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createBooking);
router.get('/user', auth, getUserBookings);
router.put('/:id', auth, updateBooking);
router.delete('/:id', auth, deleteBooking);

module.exports = router;