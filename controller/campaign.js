const Campaign = require("../model/campaign");
const Milestone = require("../model/milestone");
const Bid = require("../model/bid");
const Status = require("../config/Status");

// exports.postNewCampaign = (req, res) => {
//     const {
//         userId,
//         title,
//         description,
//         imageURL,
//         amountToRaise,
//         deadlineToBid,
//         deadlineOfProject,
//         projectBuildersRequired,
//         minAmountToRelease,
//         minAmountToFund,
//         maxEquityToDilute,
//     } = req.body.payload;

//     const newcampaign = new Campaign({
//         userId: userId,
//         title: title,
//         description: description,
//         imageURL: imageURL,
//         amountToRaise: amountToRaise,
//         deadlineToBid: deadlineToBid,
//         deadlineOfProject: deadlineOfProject,
//         projectBuildersRequired: projectBuildersRequired,
//         minAmountToRelease: minAmountToRelease,
//         minAmountToFund: minAmountToFund,
//         maxEquityToDilute: maxEquityToDilute,
//         status: Status.Status.NOT_YET_STARTED
//     })

//     newcampaign.save((err, doc) => {
//         if (err) {
//             console.log(err);
//             return res.status(400).json({ message: err });
//         }
//         res.status(200).json({
//             message: doc
//         });
//     });
// }



exports.postNewCampaign = (req, res) => {
    const {
        userId,
        title,
        description,
        imageURL,
        milestones,
        amountToRaise,
        deadlineToBid,
        deadlineOfProject,
        projectBuildersRequired,
        minAmountToRelease,
        minAmountToFund,
        maxEquityToDilute,
        contractAddress
    } = req.body.payload;

    console.log(contractAddress);
    let newCampaignId;

    const newcampaign = new Campaign({
        userId: userId,
        title: title,
        description: description,
        imageURL: imageURL,
        amountToRaise: amountToRaise,
        deadlineToBid: deadlineToBid,
        deadlineOfProject: deadlineOfProject,
        projectBuildersRequired: projectBuildersRequired,
        minAmountToRelease: minAmountToRelease,
        minAmountToFund: minAmountToFund,
        maxEquityToDilute: maxEquityToDilute,
        status: Status.Status.NOT_YET_STARTED,
        contractAddress
    })

    newcampaign.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }

        if (doc) {
            milestones.forEach((milestone) => {
                const newMilestone = Milestone({
                    milestoneNumber: milestone.id,
                    campaignId: doc._id,
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

                Campaign.findOne({ "_id": doc._id }, function (err, campaign) {
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
        }
    })
}


// Sample data to test
// {
//     "title": "Hi-Tech Drone",
//     "description": "Best Features: Foldable Drone, Wifi Camera, 720p Camera, 360° Flip, Headless Mode, Altitude Hold, One Key Take Off/ Landing.Camera - Yes, Flying Height - Upto 50 mtrs, Flying Time - 30 min, Weight - 0.410 Kgs.Camera - Yes, Flying Height - Upto 50 mtrs, Flying Time - 30 min, Weight - 0.410 Kgs.",
//     "imageURL": "https://unsplash.com/photos/ptVBlniJi50",
//     "amountToRaise": 65,
//     "deadlineToBid": "2023-03-15T06:31:15.000+00:00",
//     "deadlineOfProject": "2023-05-15T06:31:15.000+00:00", 
//     "projectBuildersRequired": false,
//     "minAmountToRelease": 20,
//     "minAmountToFund": 10,
//     "maxEquityToDilute": 8
// }

exports.getAllCampaigns = (req, res) => {
    // Campaign.aggregate([
    //     {
    //         "$project": {
    //             "userDetails": "$userId"
    //         }
    //     }
    // ])
    const { userId } = req.body;

    Campaign.find({ userId: { $ne: userId } }).populate("userId").populate("milestones").sort({ dateCreated: -1 }).exec((error, campaigns) => {
        if (error) return res.status(400).json({ message: error });

        if (campaigns) {
            return res.status(200).json({ message: campaigns });
        }
    });
};

exports.getMyPostedCampaigns = (req, res) => {
    const { userId } = req.body;
    hasFunded = true;
    Campaign.find({ userId: userId }).populate("userId").populate("milestones").sort({ dateCreated: -1 }).exec((err, campaigns) => {
        if (err) return res.status(400).json({ message: err });

        if (campaigns) {
            return res.status(200).json({ message: campaign });
        }
    })
}

exports.getCampaignByID = (req, res) => {
    const { campaignId, userId } = req.body;
    Campaign.findOne({ _id: campaignId }).populate("userId").populate("milestones").lean().exec(async (err, campaign) => {
        if (err) return res.status(400).json({ message: err });

        if (campaign) {
            campaign["hasFunded"] = await Bid.find({ campaignId: campaignId, userId: userId }).count() > 0;
            return res.status(200).json({ message: campaign });
        }
    })
}

exports.addCampaignAddress = (req, res) => {
    const {
        campaignId,
        campaignAddress
    } = req.body;

    // Campaign.findOne({"_id": campaignId}, function(err, campaign){
    //     if(err) return res.status(400).json({message: "sorry failed"});

    //     if(campaign){
    //         campaign.campaignAddress = campaignAddress;

    //         campaign.save((err, doc) => {
    //             if(err){
    //                 return res.status(400).json({message: err});
    //             }

    //             res.status(200).json({
    //                 message:doc
    //             })
    //         })
    //     }
    // });

    Campaign.updateOne(
        { _id: campaignId },
        { $set: { campaignAddress: campaignAddress } },
        { upsert: true }
    ).exec((err, campaign) => {
        if (err) return { message: "Something went wrong" };

        if (campaign) {
            return res.status(200).json({ message: campaign });
        }
    })
}
