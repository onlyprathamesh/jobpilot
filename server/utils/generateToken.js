const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (_id, userName) => {
    return jwt.sign({id: _id, userName: userName}, JWT_SECRET, {expiresIn: "30d"});
};

module.exports = {generateToken};