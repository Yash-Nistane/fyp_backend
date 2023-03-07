const express = require("express");
const { createNewMilestone, updateStatus } = require("../controller/milestone");
const router = express.Router();

router.post('/createNewMilestone', createNewMilestone);
router.post('/updateStatus', updateStatus);

module.exports = router;