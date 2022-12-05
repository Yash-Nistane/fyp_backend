const Campaign = require("../model/campaign");
const user = require("../model/user");
const mongoose = require("mongoose");

exports.createCampaign = (req, res) => {
  console.log(req.body);

  const {
    name,
    description,
    milestone,
    promises,
    targetAmount,
    minAmount,
    deadline,
    username,
  } = req.body;

  const _campaign = new Campaign({
    name,
    description,
    milestone,
    promises,
    targetAmount,
    minAmount,
    deadline,
    createdBy: username,
  });

  _campaign.save((error, campaign) => {
    if (error) {
      return res.status(400).json({
        error: "something went wrong",
      });
    }

    if (campaign) {
      user
        .findOneAndUpdate(
          { username: username },
          {
            $push: {
              campaignCreated: { cid: campaign._id },
            },
          },
          { new: true, upsert: true }
        )
        .exec((error, user) => {
          if (error) return res.status(400).json({ error });

          if (user) {
            return res.status(201).json({
              campaign,
              user,
            });
          }
        });
    }
  });
};

exports.fundCampaign = (req, res) => {
  console.log(req.body);
  const {
    username,
    //userId,
    //campaign_id
  } = req.body;

  const userId = mongoose.mongo.ObjectId(req.body.userId);
  const campaign_id = mongoose.mongo.ObjectId(req.body.campaign_id);

  user
    .findOneAndUpdate(
      { username },
      {
        $push: {
          campaignFunded: { cid: campaign_id },
        },
      },
      { new: true, upsert: true }
    )
    .exec((error, user) => {
      if (error) return res.status(400).json({ error });

      if (user) {
        Campaign.findOneAndUpdate(
          { _id: campaign_id },
          {
            $push: {
              fundedBy: { userId: userId },
            },
          },
          { new: true, upsert: true }
        ).exec((error, campaign) => {
          return res.status(201).json({
            campaign,
            user,
          });
        });
      }
    });
};

exports.getAllCampaigns = (req, res) => {
  console.log("getting all campaigns");
  Campaign.find({}).exec((error, campaigns) => {
    if (error) return res.status(400).json({ error });

    if (campaigns) {
      return res.status(200).json({ allCampaigns: campaigns });
    }
  });
};

exports.getCampaignsFunded = async (req, res) => {
  user
    .findOne({
      username: req.body.username,
    })
    .exec(async (error, user) => {
      if (error) return res.status(400).json({ error });

      if (user) {
        
        let promiseArray = [];
        await getMyData(user, promiseArray);
        return res.status(200).json({ campaignsFunded: promiseArray });
      }
    });
};

function getMyData(user, promiseArray) {
  return new Promise((rs, rj) => {
    user.campaignFunded.forEach((campaign) => {
      Campaign.findOne({ _id: campaign.cid }).exec((error, data) => {
        if (error) return res.status(400).json({ error });
        
        if (data) {
          promiseArray.push(data);
        }
        rs();
      });
    });
  });
}


exports.getCampaignsCreated = async (req, res) => {
    user
      .findOne({
        username: req.body.username,
      })
      .exec(async (error, user) => {
        if (error) return res.status(400).json({ error });
  
        if (user) {
          
          let promiseArray = [];
          await getMyData1(user, promiseArray);
          return res.status(200).json({ campaignsFunded: promiseArray });
        }
      });
  };


  function getMyData1(user, promiseArray) {
    return new Promise((rs, rj) => {
      user.campaignCreated.forEach((campaign) => {
        Campaign.findOne({ _id: campaign.cid }).exec((error, data) => {
          if (error) return res.status(400).json({ error });
          
          if (data) {
            promiseArray.push(data);
          }
          rs();
        });
      });
    });
  }

  exports.getCampaignById = (req, res) => {

    const id = mongoose.mongo.ObjectId(req.body.id)
    Campaign.findOne({_id: id }).exec((error, campaign) => {

        if (error) return res.status(400).json({ error });

        if(campaign){
            return res.status(200).json({campaign: campaign});
        }
    })
  }