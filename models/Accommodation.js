const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sequelize instance'ını içeren dosya

module.exports = (sequelize, DataTypes) => {
  const Accommodation = sequelize.define(
    "Accommodation",
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
      phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false, // veya false, uygulamana göre
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      CityId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      TownId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      VillageId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "accommodation",
      timestamps: true,
    }
  );
  // İlişkiler burada tanımlanır
  Accommodation.associate = (models) => {
    Accommodation.belongsTo(models.User, { foreignKey: "UserId" });
    Accommodation.belongsTo(models.City, { foreignKey: "CityId" });
    Accommodation.belongsTo(models.Town, { foreignKey: "TownId" });
    Accommodation.belongsTo(models.Village, { foreignKey: "VillageId" });
    Accommodation.hasMany(models.Unit, { foreignKey: "AccommodationId" });
    Accommodation.hasMany(models.Content, { foreignKey: "AccommodationId" });
    Accommodation.hasMany(models.Comment, { foreignKey: "AccommodationId" });
  };
  return Accommodation;
};
