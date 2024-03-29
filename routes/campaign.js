const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { postNewCampaign, getAllCampaigns, getMyPostedCampaigns, getCampaignByID, addCampaignAddress } = require("../controller/campaign");
const { bidOnCampaign, getMyFundedCampaigns, editBid, calcBidTotal } = require("../controller/bid");
const { selectBids } = require("../controller/auction");

router.post("/postNewCampaign", postNewCampaign);
router.post("/getAllCampaigns", getAllCampaigns);
router.post("/getMyPostedCampaigns", getMyPostedCampaigns);
router.post("/getCampaign", getCampaignByID);
router.post("/getMyFundedCampaigns", getMyFundedCampaigns);
router.post("/bidOnCampaign", bidOnCampaign);
router.post("/editBid", editBid);
router.post("/getWinners", selectBids);
router.post("/calcBidTotal", calcBidTotal);
router.post("/addCampaignAddress", addCampaignAddress);

module.exports = router;
