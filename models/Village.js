const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const Village = sequelize.define(
    "Village",
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
      TownId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "village",
    }
  );
  Village.associate = (models) => {
    Village.belongsTo(models.Town, { foreignKey: "TownId" });
    Village.hasOne(models.Accommodation, { foreignKey: "VillageId" });
  };
  return Village;
};
