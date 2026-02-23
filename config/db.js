const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.HEROKU_DB_NAME,
  process.env.HEROKU_DB_USER,
  process.env.HEROKU_DB_PASSWORD,
  {
    host: process.env.HEROKU_DB_HOST,
    port: process.env.HEROKU_DB_PORT,
    dialect: process.env.HEROKU_DB_DIALECT,
    logging: false,
    define: {
      freezeTableName: true,
      timestamps: true,
    },
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Heroku SSL bağlantısı için şart
      },
    },
  }
);

const connectDB = async () => {
  try {
    //await sequelize.sync({ alter: true });
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    //await sequelize.sync({ force: true }); // alter: true = var olan tabloları günceller
    //console.log("✅ Tables synchronized.");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
  }
};

module.exports = { sequelize, connectDB };
