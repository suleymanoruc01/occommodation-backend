const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sequelize instance'ını içeren dosya

module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    "Customer",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      uid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true, // benzersiz olmalı
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      identityNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      BookingId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "customer",
      timestamps: true,
    }
  );
  // İlişkiler burada tanımlanır
  Customer.associate = (models) => {
    Customer.belongsTo(models.Booking, { foreignKey: "BookingId" });
  };
  return Customer;
};
