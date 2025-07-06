const { body, validationResult } = require("express-validator");

const jobValidationRules = [
  body("companyName")
    .notEmpty().withMessage("Company Name is required")
    .isLength({ max: 100 }).withMessage("Company name too long"),

  body("jobDescription")
    .notEmpty().withMessage("Job Description is required")
    .isLength({ max: 5000 }).withMessage("Description too long"),

  body("location")
    .notEmpty().withMessage("Location is required"),

  body("applicationDate")
    .notEmpty().withMessage("Application Date is required")
    .isISO8601().toDate().withMessage("Invalid date format"),

  body("followUpDelay")
    .optional()
    .isInt({ min: 1, max: 30 }).withMessage("Follow-up delay must be between 1–30 days"),

  body("role")
    .notEmpty().withMessage("Role is required"),

  body("salaryRange.min")
    .optional()
    .isNumeric().withMessage("Minimum salary must be a number"),

  body("salaryRange.max")
    .optional()
    .isNumeric().withMessage("Maximum salary must be a number"),

  body("salaryRange.currency")
    .optional()
    .isIn(["INR", "USD", "EUR"]).withMessage("Invalid currency"),

  body("salaryRange.period")
    .optional()
    .isIn(["per Annum", "per Month", "per Hour"]).withMessage("Invalid salary period"),

  body("companyType")
    .notEmpty().withMessage("Company type is required")
    .isIn(["Startup", "MNC", "Mid Cap"]).withMessage("Invalid company type"),

  body("pointOfCommunication")
    .optional()
    .isLength({ max: 500 }).withMessage("Point of Communication too long"),

  body("status")
    .notEmpty().withMessage("Status is required")
    .isIn(["Applied", "Shortlisted", "Rejected"]).withMessage("Invalid status"),

  body("importantNote")
    .optional()
    .isLength({ max: 1000 }).withMessage("Important note too long"),

  body("jobLink")
    .notEmpty().withMessage("Job link is required")
    .isURL().withMessage("Invalid URL format"),
];

const jobValidateRequest = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error("Validation failed");
        error.status = 400;
        error.details = errors.array();
        return next(error);
    }
    next();
};

module.exports = { jobValidationRules, jobValidateRequest };