const mongoose = require("mongoose");

const bidsSchema = new mongoose.Schema({
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
    },
    selected: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model("Bid", bidsSchema);
