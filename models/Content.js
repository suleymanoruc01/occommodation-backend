const { DataTypes } = require("sequelize");
const sequelize = require("../config/db"); // Sequelize instance'ını içeren dosya

module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define(
    "Content",
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
      contentUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      AccommodationId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "content",
      timestamps: true,
    }
  );
  // İlişkiler burada tanımlanır
  Content.associate = (models) => {
    Content.belongsTo(models.Accommodation, { foreignKey: "AccommodationId" });
  };

  return Content;
};
