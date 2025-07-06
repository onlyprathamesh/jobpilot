const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const {setTokenCookie} = require("../utils/cookie");

const userRegister =  async (req, res, next) => {
    const {userName, email, password} = req.body;
    
    if (!userName || !email || !password) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    try {
            const userNameExists = await User.findOne({userName});
            const userEmailExists = await User.findOne({email});
            if (userNameExists || userEmailExists) {
                const error = new Error("User already exists");
                error.status = 409;
                return next(error);
            }

            const hashedPassword = await bcrypt.hash(password, 11);
        
            const createdUser = await User.create({userName, email, password:hashedPassword});
            const token = generateToken(createdUser._id, createdUser.userName);
            setTokenCookie(res, token);
            res.status(200).send({msg:"User created successfully.", token});
            console.log("User created successfully.");
        
    } catch (error) {
        next(error);
    }
}

const userLogin = async (req, res, next) => {
    const {userName, password} = req.body;

    if (!userName || !password) {
        const error = new Error("All fields are required");
        error.status = 400;
        return next(error);
    }

    try {
        const userExists = await User.findOne({userName});
        if (!userExists) {
            const error = new Error("User does not exist");
            error.status = 400;
            return next(error);
        }

        if (!userExists.password) {
            const error = new Error("User password is not set. Please reset your password");
            error.status = 400;
            return next(error);
        }
        
        const isValid = await bcrypt.compare(password, userExists.password);

        if (isValid) {
            const token = generateToken(userExists._id, userExists.userName);
            setTokenCookie(res, token);
            res.status(200).send({msg:"User Logged in successfully."});
            console.log("User Logged in successfully.");
        } else {
        const error = new Error("Failed to log in");
        error.status = 400;
        return next(error);
        }
    } catch (error) {
        next(error);
    }
}

module.exports = {userRegister, userLogin};
