const Campaign = require("../model/campaign");
const user = require("../model/user");

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
        username
    } = req.body;

    const _campaign = new Campaign ({
        name,
        description,
        milestone,
        promises,
        targetAmount,
        minAmount,
        deadline,
        createdBy: username
    });

    _campaign.save((error, campaign) => {

        if(error){
            return res.status(400).json({
                error: "something went wrong",
            });
        }

        if(campaign){

            user.findOneAndUpdate(
                {username: username},
                {
                    $push: {
                        campaignCreated: {cid:campaign._id}
                    }
                },
                { new: true, upsert: true }
            ).exec((error, user) => {
                
                if(error) return res.status(400).json({error});

                if(user){
                    return res.status(201).json({
                        campaign,
                        user
                    })
                }
            })

            ;
        }
    })
}

exports.fundCampaign = (req, res) => {

    console.log(req.body);
    const {
        username,
        userId,
        campaign_id
    } = req.body;

    user.findOneAndUpdate(
        {username},
        {
            $push: {
                campaignFunded: {cid:campaign_id}
            }
        },
        { new: true, upsert: true }
    ).exec((error, user) => {

        if(error) return res.status(400).json({error});

        if(user){

            Campaign.findOneAndUpdate(
                {_id: campaign_id},
                {
                    $push:{
                        userId: userId
                    }
                },
                
            ).exec((error, campaign) => {
                return res.status(201).json({
                    campaign,
                    user
                })
            })
            
        }

    })    
}