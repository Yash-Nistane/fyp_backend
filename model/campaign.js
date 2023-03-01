import { Status } from '../constants/Status';

const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true,
    },
    imageURL: {
        type: String,
        required: true,
        trim: true,
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    amountToRaise: {
        type: Number,
        required: true
    },
    deadlineToBid: {
        type: Date,
        required: true
    },
    deadlineOfProject: {
        type: Date,
        required: true
    },
    amountRaised: {
        type: Number,
        default: 0
    },
    projectBuildersRequired: {
        type: Boolean,
        default: false
    },
    minAmountToRelease: {
        type: Number,
        default: 0
    },
    minAmountToFund: {
        type: Number,
        required: true
    },
    maxEquityToDilute: {
        type: Number,
        required: true
    },
    fundsReleased: {
        type: Number,
        default: 0
    },
    lastMilestoneCompleted: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: Status.NOT_YET_STARTED
    }
});

module.exports = mongoose.model("Campaign", campaignSchema);
