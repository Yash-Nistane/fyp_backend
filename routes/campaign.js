const express = require("express");
const router = express.Router();
const { auth } = require("../middlewares/auth");
const { postNewCampaign, getAllCampaigns, getMyPostedCampaigns } = require("../controller/campaign");
const { bidOnCampaign } = require("../controller/bid");
const { selectBids } = require("../controller/auction");

router.post("/postNewCampaign", auth, postNewCampaign);
router.get("/getAllCampaigns", getAllCampaigns);
router.get("/getMyPostedCampaigns", auth, getMyPostedCampaigns);
router.post("/bidOnCampaign", auth, bidOnCampaign);
router.get("/auction", selectBids);

module.exports = router;
