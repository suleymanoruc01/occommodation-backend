const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define(
    "City",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "city",
    }
  );
  // İlişkiler burada tanımlanır
  City.associate = (models) => {
    City.hasMany(models.Town, { foreignKey: "CityId" });
  };
  return City;
};
