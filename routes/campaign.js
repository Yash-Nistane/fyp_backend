const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { postNewCampaign, getAllCampaigns, getMyPostedCampaigns, getCampaignByID } = require("../controller/campaign");
const { bidOnCampaign, getMyFundedCampaigns, editBid, calcBidTotal } = require("../controller/bid");
const { selectBids } = require("../controller/auction");

router.post("/postNewCampaign", postNewCampaign);
router.post("/getAllCampaigns", getAllCampaigns);
router.post("/getMyPostedCampaigns", getMyPostedCampaigns);
router.post("/getCampaign", getCampaignByID);
router.post("/getMyFundedCampaigns", getMyFundedCampaigns);
router.post("/bidOnCampaign", bidOnCampaign);
router.post("/editBid", editBid);
router.get("/auction", selectBids);
router.post("/calcBidTotal", calcBidTotal);

module.exports = router;
