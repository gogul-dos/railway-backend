const { Booking, Train } = require("../models");

exports.bookSeat = async (req, res) => {
  const { trainId, seatNumber } = req.body;
  const userId = req.user.userId;
  try {
    const train = await Train.findOne({ where: { trainId } });
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    const bookedSeats = await Booking.count({ where: { trainId } });
    if (bookedSeats >= train.totalSeats) {
      return res.status(400).json({ error: "No seats available" });
    }
    const booking = await Booking.create({ userId, trainId, seatNumber });
    res.status(201).json(booking);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getUserBookings = async (req, res) => {
  const userId = req.user.userId;
  try {
    const bookings = await Booking.findAll({ where: { userId } });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
