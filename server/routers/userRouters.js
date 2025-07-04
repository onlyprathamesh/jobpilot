const express = require("express");

const router = express.Router();

const userController = require("../controllers/userControllers")

router.route("/login").post(userController.userLogin);
router.route("/register").post(userController.userRegister);

module.exports = router;