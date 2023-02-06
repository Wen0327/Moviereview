const express = require("express");
const { create, verifyEmail,resendEmailVerificationToken } = require("../controllers/user");
const {userValidator,validate} = require('../middleWares/validator');
const router = express.Router();

router.post("/create",userValidator,validate,create);
router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendEmailVerificationToken);

module.exports = router;
