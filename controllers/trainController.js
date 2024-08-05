const { Train, Booking } = require("../models");

exports.addTrain = async (req, res) => {
  if (req.headers["api_key"] !== process.env.ADMIN_API_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  const { trainId, trainName, source, destination, totalSeats } = req.body;
  try {
    const train = await Train.create({
      trainId,
      trainName,
      source,
      destination,
      totalSeats,
    });
    res.status(201).json(train);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAvailableTrains = async (req, res) => {
  const { source, destination } = req.query;
  try {
    const trains = await Train.findAll({ where: { source, destination } });
    const trainDetails = await Promise.all(
      trains.map(async (train) => {
        const bookedSeats = await Booking.count({
          where: { trainId: train.trainId },
        });
        return {
          trainId: train.trainId,
          trainName: train.trainName,
          availableSeats: train.totalSeats - bookedSeats,
        };
      })
    );
    res.json(trainDetails);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
