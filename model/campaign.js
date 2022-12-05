const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema(
    {
        name: { 
            type: String,
            required: true,
            trim : true,
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        milestone: [
            {
                name: {
                    type: String,
                },
                fund: {
                    type: Number,
                },
                deadline: {
                    type: Date,
                }
            }
        ],
        fundedBy:[
            {id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
        ],
        createdBy: [
            {id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}}
        ],
        promises: {
            type: String,
            //required: true,
            trim: true
        },
        targetAmount: {
            type: Number,
            required: true,
        },
        minAmount: {
            type: Number,
            //required: true,
        },
        deadline: {
            type: Date,
        }
        
    }
)

module.exports = mongoose.model("Campaign", campaignSchema);