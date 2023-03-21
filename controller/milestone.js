const Milestone = require("../model/milestone");
const Campaign = require("../model/campaign");

exports.createNewMilestone = (req, res) => {
    const milestones = req.body;

    milestones.forEach((milestone) => {
        const newMilestone = Milestone({
            milestoneNumber: milestone.id,
            campaignId: milestone.campaignId,
            title: milestone.title,
            description: milestone.description,
            fundsRequired: milestone.fundsRequired,
            deadlineToComplete: milestone.deadlineToComplete
        })

        newMilestone.save((err, doc) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ message: err });
            }
        });

        Campaign.findOne({ "_id": milestone.campaignId }, function (err, campaign) {
            if (err) return res.status(400).json({ message: "cannot find campaign" });

            if (campaign) {
                campaign.milestones.push(newMilestone._id);
                campaign.save((err, doc) => {
                    if (err) {
                        return res.status(400).json({ message: err });
                    }
                })
            }
        })
    })

    return res.status(200).json({ message: "Milestones created successfully" });
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

exports.getMilestoneByID = (req, res) => {
    const { milestoneID } = req.body;
    Milestone.findOne({ _id: milestoneID }, function (err, milestone) {
        if (err) return res.status(400).json({ message: "cannot find milestone" });

        if (milestone) {
            return res.status(200).json({
                message: milestone
            });
        }
    })
}