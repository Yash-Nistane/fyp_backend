const express = require("express");
const { signup, signin, signout, viewProfile } = require("../controller/auth");
const { auth } = require("../middlewares/auth");
const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', auth, signout);
router.get('/viewProfile', viewProfile);

module.exports = router;