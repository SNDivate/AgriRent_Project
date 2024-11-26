const Booking = require('../models/Booking');

exports.createBooking = async (req, res) => {
  try {
    const booking = new Booking({
      ...req.body,
      userId: req.user._id,
    });
    await booking.save();
    res.status(201).send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user._id }).populate('equipmentId');
    res.send(bookings);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.updateBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!booking) {
      return res.status(404).send();
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send(error);
  }
};