const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { postNewCampaign, getAllCampaigns, getMyPostedCampaigns, getCampaignByID } = require("../controller/campaign");
const { bidOnCampaign, getMyFundedCampaigns, editBid } = require("../controller/bid");
const { selectBids } = require("../controller/auction");

router.post("/postNewCampaign", postNewCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getMyPostedCampaigns", getMyPostedCampaigns);
router.get("/getCampaign", getCampaignByID);
router.get("/getMyFundedCampaigns", getMyFundedCampaigns);
router.post("/bidOnCampaign", bidOnCampaign);
router.post("/editBid", editBid);
router.get("/auction", selectBids);

module.exports = router;
