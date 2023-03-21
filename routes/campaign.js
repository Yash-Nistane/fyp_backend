const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { postNewCampaign, getAllCampaigns, getMyPostedCampaigns, getCampaignByID } = require("../controller/campaign");
const { bidOnCampaign, getMyFundedCampaigns, editBid } = require("../controller/bid");
const { selectBids } = require("../controller/auction");

router.post("/postNewCampaign", auth, postNewCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getMyPostedCampaigns", auth, getMyPostedCampaigns);
router.post("/getCampaign", getCampaignByID);
router.get("/getMyFundedCampaigns", auth, getMyFundedCampaigns);
router.post("/bidOnCampaign", auth, bidOnCampaign);
router.post("/editBid", editBid);
router.get("/auction", selectBids);

module.exports = router;
