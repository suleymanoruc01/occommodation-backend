const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sequelize instance'ını içeren dosya

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
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
      commentBody: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      UserId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      AccommodationId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      tableName: "comment",
      timestamps: true,
    }
  );
  // İlişkiler burada tanımlanır
  Comment.associate = (models) => {
    Comment.belongsTo(models.User, { foreignKey: "UserId" });
    Comment.belongsTo(models.Accommodation, { foreignKey: "AccommodationId" });
  };
  return Comment;
};
