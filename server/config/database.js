const { Sequelize } = require("sequelize");
const UserModel = require("../models/User");
const FavouriteModel = require("../models/Favourite");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
  },
);

const User = UserModel(sequelize);
const Favourite = FavouriteModel(sequelize);

User.hasMany(Favourite, { foreignKey: "userId", as: "favourites" });
Favourite.belongsTo(User, { foreignKey: "userId", as: "user" });

module.exports = {
  sequelize,
  User,
  Favourite,
};
