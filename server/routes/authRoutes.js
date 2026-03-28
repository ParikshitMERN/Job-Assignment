const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");
const validate = require("../middleware/validationMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const {
  signupValidator,
  loginValidator,
} = require("../middleware/validators/authValidator");
router.post("/signup", signupValidator, validate, signup);
router.post("/login", loginValidator, validate, login);
router.get("/profile", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

module.exports = router;
