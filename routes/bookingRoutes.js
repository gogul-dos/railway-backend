const express = require("express");
const {
  bookSeat,
  getUserBookings,
} = require("../controllers/bookingController");
const { authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/book", authMiddleware, bookSeat);
router.get("/bookings", authMiddleware, getUserBookings);

module.exports = router;
