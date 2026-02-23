require("dotenv").config();

module.exports = {
  development: {
    username: process.env.HEROKU_DB_USER,
    password: process.env.HEROKU_DB_PASSWORD,
    database: process.env.HEROKU_DB_NAME,
    host: process.env.HEROKU_DB_HOST,
    port: process.env.HEROKU_DB_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  },
};
