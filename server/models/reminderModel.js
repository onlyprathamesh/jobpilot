const mongoose = require("mongoose");

const reminderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    reminderText: {
        type: String
    },
    sent: {
        type: Boolean,
        default: false
    }
}, {timestamp: true});

const Reminder = mongoose.model("Reminder", reminderSchema);

module.exports = Reminder;