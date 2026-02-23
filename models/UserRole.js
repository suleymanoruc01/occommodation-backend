const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

module.exports = (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      RoleId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "userRole",
    }
  );
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.Role, { foreignKey: "RoleId" });
    UserRole.belongsTo(models.User, { foreignKey: "UserId" });
  };
  return UserRole;
};
