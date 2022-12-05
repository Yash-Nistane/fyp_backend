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
            {id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
        ], 
        campaignFunded: [
            {id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
        ]

    }
)

module.exports = mongoose.model("User", userSchema);