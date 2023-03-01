import { Status } from '../constants/Status';

const mongoose = require("mongoose");

const fundingsSchema = new mongoose.Schema({
    campaignId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bidId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bid'
    },
});

module.exports = mongoose.model("Bid", bidsSchema);
