const Campaign = require("../model/campaign");
const Status = require("../config/Status");

exports.postNewCampaign = (req, res) => {
    const {
        title,
        description,
        imageURL,
        amountToRaise,
        deadlineToBid,
        deadlineOfProject,
        projectBuildersRequired,
        minAmountToRelease,
        minAmountToFund,
        maxEquityToDilute,
    } = req.body;

    const newcampaign = new Campaign({
        userId: req.user._id,
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
        status: Status.Status.NOT_YET_STARTED
    })

    newcampaign.save((err, doc) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ message: err });
        }
        res.status(200).json({
            message: doc
        });
    });
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
    Campaign.find({}).sort({ dateCreated: -1 }).exec((error, campaigns) => {
        if (error) return res.status(400).json({ message: error });

        if (campaigns) {
            return res.status(200).json({ message: campaigns });
        }
    });
};


exports.getMyPostedCampaigns = (req, res) => {
    Campaign.find({ userId: req.user._id }).sort({ dateCreated: -1 }).exec((err, campaigns) => {
        if (err) return res.status(400).json({ message: err });

        if (campaigns) {
            return res.status(200).json({ message: campaigns });
        }
    })
}

exports.getCampaignByID = (req, res) => {
    console.log("Here");
    const { campaignID } = req.body;
    console.log(campaignID);
    Campaign.findOne({ _id: campaignID }, function (err, campaign) {
        if (err) return res.status(400).json({ message: "cannot find campaign details" });

        if (campaign) {
            console.log("res");
            return res.status(200).json({
                message: campaign
            });
        }
    })
}


// exports.fundCampaign = (req, res) => {
//   //console.log(req.body);
//   const {
//     username,
//     //userId,
//     //campaign_id,
//     funded,
//     fundsRaised,
//   } = req.body;

//   const userId = mongoose.mongo.ObjectId(req.body.userId);
//   const campaign_id = mongoose.mongo.ObjectId(req.body.campaign_id);

//   user
//     .findOneAndUpdate(
//       { username },
//       {
//         $push: {
//           campaignFunded: {
//             cid: campaign_id,
//             $inc: {
//               fundsRaised: funded,
//             },
//           },
//         },
//       },
//       { new: true, upsert: true }
//     )
//     .exec((error, user) => {
//       if (error) return res.status(400).json({ error });

//       if (user) {
//         Campaign.findOneAndUpdate(
//           { _id: campaign_id },
//           {
//             $push: {
//               fundedBy: { userId: userId },
//             },
//             fundsRaised,
//           },
//           { new: true, upsert: true }
//         ).exec((error, campaign) => {
//           return res.status(201).json({
//             campaign,
//             user,
//           });
//         });
//       }
//     });
// };



// exports.getCampaignsFunded = async (req, res) => {
//   const username = req.body.username;
//   user
//     .findOne({
//       username: username,
//     })
//     .exec(async (error, user) => {
//       if (error) return res.status(400).json({ error });

//       if (user) {
//         let promiseArray = [];
//         await getMyData(user, promiseArray);
//         console.log(promiseArray);
//         return res.status(200).json({ campaignsFunded: promiseArray });
//       }
//     });
// };

// function getMyData(user, promiseArray) {
//   return new Promise((rs, rj) => {
//     user.campaignFunded.forEach((campaign) => {
//       Campaign.findOne({ _id: campaign.cid }).exec((error, data) => {
//         if (error) return res.status(400).json({ error });

//         if (data) {
//           promiseArray.push(data);
//         }
//         rs();
//       });
//     });
//   });
// }

// exports.getCampaignsCreated = async (req, res) => {
//   user
//     .findOne({
//       username: req.body.username,
//     })
//     .exec(async (error, user) => {
//       if (error) return res.status(400).json({ error });

//       if (user) {
//         let promiseArray = [];
//         await getMyData1(user, promiseArray);
//         return res.status(200).json({ campaignCreated: promiseArray });
//       } else {
//         return res.status(200).json({ campaignCreated: [] });
//       }
//     });
//   return res.status(404);
// };

// function getMyData1(user, promiseArray) {
//   return new Promise((rs, rj) => {
//     var x = 0;
//     user.campaignCreated.forEach((campaign) => {
//       Campaign.findOne({ _id: campaign.cid }).exec((error, data) => {
//         if (error) return res.status(400).json({ error });

//         if (data) {
//           promiseArray.push(data);
//         }
//         x++;
//       });
//     });
//     const myinterval = setInterval(() => {
//       //console.log(x);
//       if (x == user.campaignCreated.length) {
//         rs();
//         clearInterval(myinterval);
//       }
//     }, 1000);
//   });
// }

// exports.getCampaignById = (req, res) => {
//   const id = mongoose.mongo.ObjectId(req.body.id);
//   Campaign.findOne({ _id: id }).exec((error, campaign) => {
//     if (error) return res.status(400).json({ error });

//     if (campaign) {
//       return res.status(200).json({ campaign: campaign });
//     }
//   });
// };

// exports.updateMilestone = (req, res) => {
//   const id = mongoose.mongo.ObjectId(req.body.id);
//   const decValue = req.body.decValue;
//   Campaign.findOneAndUpdate(
//     { _id: id },
//     {
//       $inc: {
//         currentMilestone: 1,
//         currentAmount: -decValue,
//       },
//     },
//     { new: true, upsert: true }
//   ).exec((error, campaign) => {
//     if (error) return res.status(404).json({ error });
//     else return res.status(201).json({ campaign });
//   });
// };
