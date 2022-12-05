const express = require("express");
const {createCampaign, fundCampaign, getAllCampaigns, getCampaignsFunded, getCampaignsCreated} = require("../controller/campaign");
const router = express.Router();

router.post("/createCampaign", createCampaign);
router.post("/fundCampaign", fundCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getCampaignsFunded", getCampaignsFunded);
router.get("/getCampaignsCreated", getCampaignsCreated);

module.exports = router;
