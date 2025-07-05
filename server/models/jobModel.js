const mongoose = require("mongoose")

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    companyName: {
        type: String,
        requiredd: true
    },
    jobDescription: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    applicationDate: {
        type: Date,
        required: true
    },
    followUpDelay: {
        type: Number,
        default: 5
    },
    role: {
        type: String,
        required: true
    },
    salaryRange: {
        min: {
            type: Number,
        },
        max: {
            type: Number,
        },
        currency: {
            type: String,
        },
        period: {
            type: String,
        }
    },
    companyType: {
        type: String,
        required: true
    },
    pointOfCommunication: {
        type: String,
    },
    status: {
        type: String,
        required: true
    }, 
    importantNote: {
        type: String,
    },
    jobLink: {
        type: String,
        required: true
    }
}, {timestamps: true});

jobSchema.index({userId: 1});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;