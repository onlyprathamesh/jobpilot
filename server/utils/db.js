const mongoose = require('mongoose');
require('dotenv').config();

const URI = process.env.MONGODB_URI;

const connectDB = async () => {
    try {
        mongoose.connect(URI);
        console.log('Connected to MongoDB database.');
    }
    catch (error) {
        console.error("MongoDB connection failed.", error);
    }
}

module.exports = connectDB;