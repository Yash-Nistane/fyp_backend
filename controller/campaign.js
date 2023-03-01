// const Campaign = require("../model/campaign");
// const user = require("../model/user");
// const mongoose = require("mongoose");

// exports.createCampaign = (req, res) => {
//   console.log(req.body);

//   const {
//     name,
//     description,
//     milestone,
//     promises,
//     targetAmount,
//     minAmount,
//     deadline,
//     username,
//     fundsRaised,
//     currentMilestone,
//     currentAmount,
//   } = req.body;

//   const _campaign = new Campaign({
//     name,
//     description,
//     milestone,
//     promises,
//     targetAmount,
//     minAmount,
//     deadline,
//     createdBy: username,
//     fundsRaised,
//     currentMilestone,
//     currentAmount,
//   });

//   _campaign.save((error, campaign) => {
//     if (error) {
//       return res.status(400).json({
//         error: "something went wrong",
//       });
//     }

//     if (campaign) {
//       user
//         .findOneAndUpdate(
//           { username: username },
//           {
//             $push: {
//               campaignCreated: { cid: campaign._id },
//             },
//           },
//           { new: true, upsert: true }
//         )
//         .exec((error, user) => {
//           if (error) return res.status(400).json({ error });

//           if (user) {
//             return res.status(201).json({
//               campaign,
//               user,
//             });
//           }
//         });
//     }
//   });
// };

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

// exports.getAllCampaigns = (req, res) => {
//   //console.log("getting all campaigns");

//   Campaign.find({}).exec((error, campaigns) => {
//     if (error) return res.status(400).json({ error });

//     if (campaigns) {
//       return res.status(200).json({ allCampaigns: campaigns });
//     }
//   });
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
