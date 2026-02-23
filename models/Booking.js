const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sequelize instance'ını içeren dosya

module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
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
      status: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      startDate: {
        type: DataTypes.DATE,

        allowNull: false,
      },
      endDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      customerCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // veya false, uygulamana göre
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UnitId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "booking",
      timestamps: true,
    }
  );
  // İlişkiler burada tanımlanır
  Booking.associate = (models) => {
    Booking.belongsTo(models.User, { foreignKey: "UserId" });
    Booking.belongsTo(models.Unit, { foreignKey: "UnitId" });
    Booking.hasMany(models.Customer, { foreignKey: "BookingId" });
  };
  return Booking;
};
