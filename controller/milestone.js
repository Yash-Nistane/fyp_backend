const Milestone = require("../model/milestone");
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
}

exports.updateStatus = (req, res) => {

}