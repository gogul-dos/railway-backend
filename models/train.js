module.exports = (sequelize, DataTypes) => {
  const Train = sequelize.define("Train", {
    trainId: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    trainName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    source: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    destination: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Train;
};
