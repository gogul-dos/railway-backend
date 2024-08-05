module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define("Booking", {
    seatNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    bookingTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });

  return Booking;
};
