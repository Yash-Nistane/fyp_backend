const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
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
      },
      status: {
        type: String,
      },
    },
  ],
  fundedBy: [{ userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" } }],
  createdBy: {
    type: String,
    required: true,
  },
  promises: {
    type: String,
    //required: true,
    trim: true,
  },
  targetAmount: {
    type: Number,
    required: true,
  },
  minAmount: {
    type: Number,
    //required: true,
  },
  fundsRaised: {
    type: Number,
    required: true,
  },
  deadline: {
    type: Date,
  },
  currentMilestone: {
    type: Number,
  },
  currentAmount: {
    type: Number,
  }
});

module.exports = mongoose.model("Campaign", campaignSchema);
