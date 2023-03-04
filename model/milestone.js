const Status = require("../config/Status");
const mongoose = require("mongoose");

const milestoneSchema = new mongoose.Schema({
    milestoneNumber: {
        type: Number,
        default: 1
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
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
    fundsRequired: {
        type: Number,
        required: true
    },
    deadlineToComplete: {
        type: Date,
        required: true
    },
    workingStatus: {
        type: Number,
        default: Status.Status.NOT_YET_STARTED
    },
    fundStatus: {
        type: Number,
        default: Status.Status.YET_TO_RELEASE
    },
    proofOfCompletion: {
        type: String,
        trim: true,
    },
    dateOfCompletion: {
        type: Date,
        default: null
    },
});

module.exports = mongoose.model("Milestone", milestoneSchema);
