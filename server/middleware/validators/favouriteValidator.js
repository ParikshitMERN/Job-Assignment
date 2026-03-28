const { body, param } = require("express-validator");

exports.addFavouriteValidator = [
  body("propertyName")
    .trim()
    .notEmpty()
    .withMessage("Property name is required")
    .withMessage("Property name must be at least 2 characters"),

  body("address")
    .trim()
    .notEmpty()
    .withMessage("Address is required")
    .withMessage("Address must be at least 5 characters"),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ min: 0 })
    .withMessage("Price must be a positive number"),

  body("bedrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bedrooms must be a positive number"),

  body("bathrooms")
    .optional()
    .isInt({ min: 0 })
    .withMessage("Bathrooms must be a positive number"),

  body("description").optional().trim(),
];

exports.removeFavouriteValidator = [
  param("id")
    .notEmpty()
    .withMessage("Favourite ID is required")
    .isUUID()
    .withMessage("Invalid favourite ID"),
];
