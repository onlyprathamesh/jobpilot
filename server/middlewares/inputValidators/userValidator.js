const {body, validationResult}= require("express-validator");

const userRegisterValidationRules = [
  body("userName")
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3 }).withMessage("Username must be at least 3 characters long"),

  body("email")
    .notEmpty().withMessage("Email is required")
    .isEmail().withMessage("Must be a valid email address")
    .normalizeEmail(),

  body("password")
    .notEmpty().withMessage("Password is required")
    .isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
];

const userLoginValidationRules = [
  body("userName")
    .notEmpty().withMessage("Username is required"),

  body("password")
    .notEmpty().withMessage("Password is required")
];

const userValidateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.status = 400;
        error.details = errors.array();
        return next(error);
    }
    next();
}

module.exports = {userRegisterValidationRules, userLoginValidationRules, userValidateRequest};