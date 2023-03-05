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
