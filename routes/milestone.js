const express = require("express");
const { createNewMilestone } = require("../controller/milestone");
// const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post('/createNewMilestone', createNewMilestone);

module.exports = router;