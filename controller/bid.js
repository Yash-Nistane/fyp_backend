const Bid = require("../model/bid");


exports.bidOnCampaign = (req, res) => {
    const {
        userId,
        campaignId,
        amountOffered,
        equityAsked
    } = req.body;

    Bid.updateOne(
        { userId: userId, campaignId: campaignId },
        { $set: { amountOffered: amountOffered, equityAsked: equityAsked } },
        { upsert: true }
    ).exec((err, bid) => {
        if (err) return { message: "cannot save bid" };

        if (bid) {
            return res.status(200).json({ message: "Bid saved successfully" });
        }
    });
}


exports.getMyFundedCampaigns = (req, res) => {
    const { userId } = req.body;
    Bid.find({ userId: userId }).populate("userId").populate({
        path: 'campaignId',
        populate: { path: 'milestones' }
    })
        .sort({ dateOfBid: -1 }).exec((err, bids) => {
            if (err) return res.status(400).json({ message: "Could not find bids" });

            if (bids) {
                return res.status(200).json({ message: bids });
            }
        })
}

exports.editBid = (req, res) => {
    const {
        _id,
        amountOffered,
        equityAsked,
    } = req.body;

    Bid.findOne({ _id: _id }, function (err, bid) {
        if (err) return res.status(400).json({ message: "cannot find Bid" });

        if (bid) {
            bid.amountOffered = amountOffered;
            bid.equityAsked = equityAsked;
            bid.dateOfBid = new Date();
            bid.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ message: "cannot update Bid" });
                }
                res.status(200).json({
                    message: doc
                });
            });
        }
    })
}

exports.calcBidTotal = (req, res) => {
    const { campaignId } = req.body;

    Bid.aggregate([
        {
            $group:
            {
                _id: "$campaignId",
                totalAmount: { $sum: "$amountOffered" }
            }
        }
    ], function (err, data) {
        if (err) return res.status(400).json({ message: err });

        if (data) {
            return res.status(200).json({ message: data });
        }
    })
}