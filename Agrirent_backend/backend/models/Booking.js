const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  equipmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Equipment', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rentalDate: { type: Date, required: true },
});

module.exports = mongoose.model('Booking', bookingSchema);