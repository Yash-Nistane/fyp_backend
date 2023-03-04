const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { postNewCampaign, getAllCampaigns, getMyPostedCampaigns } = require("../controller/campaign");

router.post("/postNewCampaign", auth, postNewCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getMyPostedCampaigns", auth, getMyPostedCampaigns);

module.exports = router;
