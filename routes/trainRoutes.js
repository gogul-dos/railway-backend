const express = require("express");
const {
  addTrain,
  getAvailableTrains,
} = require("../controllers/trainController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const { adminMiddleware } = require("../middlewares/adminMiddleware");

const router = express.Router();

router.post("/add", authMiddleware, adminMiddleware, addTrain);
router.get("/availability", authMiddleware, getAvailableTrains);

module.exports = router;
