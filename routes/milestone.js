const express = require("express");
const { createNewMilestone, updateStatus, getMilestoneByID } = require("../controller/milestone");
const router = express.Router();

router.post('/createNewMilestone', createNewMilestone);
router.post('/updateStatus', updateStatus);
router.get('/getMilestone', getMilestoneByID);

module.exports = router;