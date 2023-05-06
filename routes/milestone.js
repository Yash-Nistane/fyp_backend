const express = require("express");
const { createNewMilestone, updateStatus, getMilestoneByID, voteMilestone, uploadProof } = require("../controller/milestone");
const router = express.Router();

router.post('/createNewMilestone', createNewMilestone);
router.post('/updateStatus', updateStatus);
router.post('/getMilestone', getMilestoneByID);
router.post('/voteMilestone', voteMilestone);
router.post('/uploadProof', uploadProof);

module.exports = router;