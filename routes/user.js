const express = require("express");
const { create, verifyEmail,resendEmailVerificationToken, forgetPassword, sendResetPasswordTokenStatus, resetPassword, signIn } = require("../controllers/user");
const {userValidator,validate, validPassword,signInValidator} = require('../middleWares/validator');
const {isValidPasswordResetToken} = require('../middleWares/user');
const router = express.Router();

router.post("/create",userValidator,validate,create);
router.post("/sign-in",signInValidator,validate,signIn);
router.post("/verify-email", verifyEmail);
router.post("/resend-verify-email", resendEmailVerificationToken);
router.post('/forget-password',forgetPassword);
router.post('/verify-password-reset-token',isValidPasswordResetToken,sendResetPasswordTokenStatus);
router.post('/password-reset',isValidPasswordResetToken,resetPassword,validPassword,validate);

module.exports = router;
