require("dotenv").config();
const { Sequelize } = require("sequelize");

// Load environment variables
const dbConfig = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: "mysql",
};

// Initialize Sequelize
const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.username,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  }
);

// Test database connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Load models
const db = {
  Sequelize,
  sequelize,
  User: require("./user")(sequelize, Sequelize),
  Train: require("./train")(sequelize, Sequelize),
  Booking: require("./booking")(sequelize, Sequelize),
};

// Define associations here if needed

// Sync database schema (optional, use migrations in production)
sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database synchronized.");
  })
  .catch((err) => {
    console.error("Error synchronizing database:", err);
  });

module.exports = db;
