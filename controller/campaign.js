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
                        campaignCreated: campaign._id
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

    const {
        usernane,
        campaign_id
    } = req.body;

    

    
}