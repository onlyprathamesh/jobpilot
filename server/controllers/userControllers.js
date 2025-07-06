const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const {generateToken} = require("../utils/generateToken");
const {setTokenCookie} = require("../utils/cookie");

const userRegister =  async (req, res) => {
    const {userName, email, password} = req.body;
    
    if (!userName || !email || !password) {
        return res.status(400).send({msg:"All fields are required."});
    }

    try {
            const userNameExists = await User.findOne({userName});
            const userEmailExists = await User.findOne({email});
            if (userNameExists || userEmailExists) {
                return res.status(409).send({msg:"User already exists."});
            }

            const hashedPassword = await bcrypt.hash(password, 11);
        
            const createdUser = await User.create({userName, email, password:hashedPassword});
            const token = generateToken(createdUser._id, createdUser.userName);
            setTokenCookie(res, token);
            res.status(200).send({msg:"User created successfully.", token});
            console.log("User created successfully.");
        
    } catch (error) {
        res.status(400).send({msg:"Error creating user.", error: error.message});
        console.log("Error creating user.", error.message)
    }
}

const userLogin = async (req, res) => {
    const {userName, password} = req.body;

    if (!userName || !password) {
        return res.status(400).send({msg:"All fields are required."});
    }

    try {
        const userExists = await User.findOne({userName});
        if (!userExists) {
            return res.status(400).send({msg:"User does not exist."});
        }

        if (!userExists.password) {
            return res.status(400).send({msg:"User password is not set. Please reset your password."});
        }
        
        const isValid = await bcrypt.compare(password, userExists.password);

        if (isValid) {
            const token = generateToken(userExists._id, userExists.userName);
            setTokenCookie(res, token);
            res.status(200).send({msg:"User Logged in successfully."});
            console.log("User Logged in successfully.");
        } else {
        res.status(400).send({msg:"Failed to log in."});
        console.error("Failed to log in.", error.stack);
        }
    } catch (error) {
        res.status(400).send({msg:"Failed to log in.", error:error.message});
        console.log("Failed to log in.", error.message);
    }
}

module.exports = {userRegister, userLogin};
