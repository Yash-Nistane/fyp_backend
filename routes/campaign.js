const express = require("express");
const {createCampaign, fundCampaign, getAllCampaigns} = require("../controller/campaign");
const router = express.Router();

router.post("/createCampaign", createCampaign);
router.post("/fundCampaign", fundCampaign);
router.get("/getAllCampaigns", getAllCampaigns);

module.exports = router;
