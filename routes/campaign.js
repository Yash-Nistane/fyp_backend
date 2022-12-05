const express = require("express");
const {createCampaign, fundCampaign, getAllCampaigns, getCampaignsFunded} = require("../controller/campaign");
const router = express.Router();

router.post("/createCampaign", createCampaign);
router.post("/fundCampaign", fundCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getCampaignsFunded", getCampaignsFunded);

module.exports = router;
