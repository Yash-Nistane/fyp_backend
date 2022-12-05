const express = require("express");
const {createCampaign} = require("../controller/campaign");
const router = express.Router();

router.post("/createCampaign", createCampaign);

module.exports = router;
