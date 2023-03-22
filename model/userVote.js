const mongoose = require("mongoose");

const userVoteSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    milestoneId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Milestone'
    },
    vote: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model("UserVote", userVoteSchema);
