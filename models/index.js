const { sequelize } = require("../config/db"); // Sequelize instance'ını al
const Sequelize = require("sequelize");

const Accommodation = require("./Accommodation")(
  sequelize,
  Sequelize.DataTypes
);
const Booking = require("./Booking")(sequelize, Sequelize.DataTypes);
const City = require("./City")(sequelize, Sequelize.DataTypes);
const Comment = require("./Comment")(sequelize, Sequelize.DataTypes);
const Content = require("./Content")(sequelize, Sequelize.DataTypes);
const Customer = require("./Customer")(sequelize, Sequelize.DataTypes);
const Role = require("./Role")(sequelize, Sequelize.DataTypes);
const Town = require("./Town")(sequelize, Sequelize.DataTypes);
const Unit = require("./Unit")(sequelize, Sequelize.DataTypes);
const UserRole = require("./UserRole")(sequelize, Sequelize.DataTypes);
const Village = require("./Village")(sequelize, Sequelize.DataTypes);
const User = require("./User")(sequelize, Sequelize.DataTypes);

// Tüm modelleri bir objede topla
const db = {
  sequelize,
  Sequelize,
  Accommodation,
  Booking,
  City,
  Comment,
  Content,
  Customer,
  Role,
  Town,
  Unit,
  UserRole,
  Village,
  User,
};

// İlişkileri tanımla
Object.keys(db).forEach((modelName) => {
  if (db[modelName]?.associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
