const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sequelize instance'ını içeren dosya

module.exports = (sequelize, DataTypes) => {
  const Unit = sequelize.define(
    "Unit",
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
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // veya false, uygulamana göre
      },
      AccommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "unit",
      timestamps: true,
    }
  );
  Unit.associate = (models) => {
    Unit.belongsTo(models.Accommodation, { foreignKey: "AccommodationId" });
    Unit.hasMany(models.Booking, { foreignKey: "UnitId" });
  };
  return Unit;
};
