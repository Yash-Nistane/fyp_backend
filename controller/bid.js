const Bid = require("../model/bid");


exports.bidOnCampaign = (req, res) => {
    const {
        campaignId,
        amountOffered,
        equityAsked
    } = req.body;

    const newBid = Bid({
        "userId": req.user._id,
        "campaignId": campaignId,
        "amountOffered": amountOffered,
        "equityAsked": equityAsked
    })

    newBid.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
        res.status(200).json({
            message: doc
        });
    });
}


exports.getMyFundedCampaigns = (req, res) => {
    Bid.find({ userId: req.user._id }).sort({ dateOfBid: -1 }).exec((err, bids) => {
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