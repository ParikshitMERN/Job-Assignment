const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Favourite = sequelize.define("Favourite", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    propertyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    bedrooms: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    bathrooms: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    description: {
      type: DataTypes.TEXT,
      defaultValue: "",
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
  return Favourite;
};
