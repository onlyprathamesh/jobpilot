const express = require("express");

const router = express.Router();

const userController = require("../controllers/userControllers");
const { userLoginValidationRules, userValidateRequest, userRegisterValidationRules } = require("../middlewares/inputValidators/userValidator");


router.route("/login").post(userLoginValidationRules, userValidateRequest, userController.userLogin);
router.route("/register").post(userRegisterValidationRules, userValidateRequest, userController.userRegister);

module.exports = router;