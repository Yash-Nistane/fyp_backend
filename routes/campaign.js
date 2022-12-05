const express = require("express");
const {
    createCampaign, 
    fundCampaign, 
    getAllCampaigns, 
    getCampaignsFunded, 
    getCampaignsCreated, 
    getCampaignById
} = require("../controller/campaign");
const router = express.Router();

router.post("/createCampaign", createCampaign);
router.post("/fundCampaign", fundCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getCampaignsFunded", getCampaignsFunded);
router.get("/getCampaignsCreated", getCampaignsCreated);
router.get("/getCampaignById", getCampaignById);

module.exports = router;
