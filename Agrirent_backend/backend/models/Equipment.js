const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  condition: { type: String, required: true },
  rentalPrice: { type: Number, required: true },
  availabilityDateStart: { type: Date, required: true },
  availabilityDateEnd: { type: Date, required: true },
  image: { type: String, required: true },
  ownerName: { type: String, required: true },
  address: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

module.exports = mongoose.model('Equipment', equipmentSchema);