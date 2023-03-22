const Milestone = require("../model/milestone");
const Campaign = require("../model/campaign");
const UserVote = require("../model/userVote");
const Bid = require("../model/bid");

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

exports.voteMilestone = (req, res) => {
    const {
        userId,
        milestoneId,
        vote
    } = req.body;

    Milestone.findOne({ _id: milestoneId }, function (err, milestone) {
        if (err) return res.status(400).json({ message: err });

        if (milestone) {
            Bid.findOne({ userId: userId, campaignId: milestone.campaignId }, function (err, bid) {
                if (err) return res.status(400).json({ message: "You have not bid on this campaign" });
            })

            UserVote.findOne({ userId: userId, milestoneId: milestoneId }, function (err, voted) {
                if (voted) {
                    return res.status(400).json({ message: "You have already voted" });
                }
                else {
                    const newVote = UserVote({
                        userId: userId,
                        milestoneId: milestoneId,
                        vote: vote
                    })

                    newVote.save((err) => {
                        if (err) {
                            return res.status(400).json({ message: err });
                        }
                        else {
                            if (vote == true) {
                                milestone.approveVote = milestone.approveVote + 1;
                            }
                            else {
                                milestone.disapproveVote = milestone.disapproveVote + 1;
                            }
                            milestone.save((err, doc) => {
                                if (err) {
                                    return res.status(400).json({ message: err });
                                }
                            });

                            return res.status(200).json({ message: "Your vote is saved." });
                        }
                    });
                }
            })
        }
    })

}
