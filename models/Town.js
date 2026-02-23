const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const Town = sequelize.define(
    "Town",
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
      CityId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "town",
    }
  );
  Town.associate = (models) => {
    Town.belongsTo(models.City, { foreignKey: "CityId" });
    Town.hasMany(models.Village, { foreignKey: "TownId" });
  };
  return Town;
};
