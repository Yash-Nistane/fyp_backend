const Milestone = require("../model/milestone");
const Campaign = require("../model/campaign");
// const Status = require("../config/Status");

exports.createNewMilestone = (req, res) => {
    const {
        milestoneNumber,
        campaignId,
        title,
        description,
        fundsRequired,
        deadlineToComplete
    } = req.body;

    const newMilestone = Milestone({
        milestoneNumber: milestoneNumber,
        campaignId: campaignId,
        title: title,
        description: description,
        fundsRequired: fundsRequired,
        deadlineToComplete: deadlineToComplete
    })

    newMilestone.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
        res.status(200).json({
            message: doc
        });
    });

    Campaign.findOne({ "_id": campaignId }, function (err, campaign) {
        if (err) return res.status(400).json({ message: "cannot find campaign" });

        if (campaign) {
            campaign.milestones.push(newMilestone._id);
            campaign.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }
                res.status(200).json({
                    message: doc
                });
            })
        }
    })
}

exports.updateStatus = (req, res) => {
    const {
        milestoneNumber,
        campaignId,
        workingStatus,
        fundStatus,
        proofOfCompletion
    } = req.body;

    Milestone.findOne({ "campaignId": campaignId, "milestoneNumber": milestoneNumber }, function (err, milestone) {
        if (err) return res.status(400).json({ message: "cannot find milestone" });

        if (milestone) {
            milestone.workingStatus = workingStatus;
            milestone.fundStatus = fundStatus;
            milestone.proofOfCompletion = proofOfCompletion;
            milestone.dateOfCompletion = new Date();
            milestone.save((err, doc) => {
                if (err) {
                    return res.status(400).json({ message: err });
                }
                res.status(200).json({
                    message: doc
                });
            });
        }
    })

}