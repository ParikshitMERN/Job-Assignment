const express = require("express");
const router = express.Router();
const {
  addFavourite,
  getFavourites,
  removeFavourite,
} = require("../controllers/favouriteController");
const validate = require("../middleware/validationMiddleware");
const {
  addFavouriteValidator,
  removeFavouriteValidator,
} = require("../middleware/validators/favouriteValidator");
const authMiddleware = require("../middleware/authMiddleware");

router.post(
  "/add",
  authMiddleware,
  addFavouriteValidator,
  validate,
  addFavourite,
);
router.get("/my-favourites", authMiddleware, getFavourites);
router.delete(
  "/remove/:id",
  authMiddleware,
  removeFavouriteValidator,
  validate,
  removeFavourite,
);

module.exports = router;
