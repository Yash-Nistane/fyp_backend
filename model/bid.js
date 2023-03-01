const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    amountOffered: {
        type: Number,
        required: true
    },
    equityAsked: {
        type: Number,
        required: true
    },
    dateOfBid: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Bid", bidsSchema);
