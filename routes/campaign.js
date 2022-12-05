const express = require("express");
const {createCampaign, fundCampaign} = require("../controller/campaign");
const router = express.Router();

router.post("/createCampaign", createCampaign);
router.post("/fundCampaign", fundCampaign);

module.exports = router;
