const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { 
            type: String,
            required: true,
            trim : true,
        },
        username: {
            type: String,
            required: true,
            trim: true
        },
        password: {
            type: String,
            required: true,
            trim: true
        },
        campaignCreated: [
            {cid: {type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'}}
        ], 
        campaignFunded: [
            {
                cid: {type: mongoose.Schema.Types.ObjectId, ref: 'Campaign'},
                funded: {
                    type: Number,
                }
            }
        ]

    }
)

module.exports = mongoose.model("User", userSchema);