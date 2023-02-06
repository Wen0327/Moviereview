const crypto = require('crypto')
const User = require('../models/user');
const EmailVerificationToken = require("../models/emailVerificationToken")
const PasswordResetToken = require("../models/passwordResetToken")
const {isValidObjectId} = require("mongoose");
const { generateOTP, generateTransporter } = require('../utils/mail');
const { sendError } = require('../utils/helper');


//get unique ID
exports.create = async(req, res) => {
  const {name, password, email}=req.body

  //
  const oldUser = await User.findOne({email});

  if (oldUser) return sendError(res,"This user ID has already exist!")
  
  const newUser =  new User({name, password, email})
  //save function is an async f()
  await newUser.save();

  //generate 6 digit otp(one-time password)
  let OTP= generateOTP();

  const newEmailVerificationToken = new EmailVerificationToken({owner: newUser._id,token: OTP});

  await newEmailVerificationToken.save()

  var transport = generateTransporter();

  transport.sendMail({
    from:'verification@reviewapp.com',
    to: newUser.email,
    subject: 'Email Verification',
    html:
    `<p>Your Verification OTP</p>
    <h1>${OTP}</h1>`
  });

  res.status(201).json({
    message: "Please verify your email. OTP has been sent to your email account!",
  })
};

exports.verifyEmail = async(req,res) =>{
  const { userId, OTP} = req.body

  if(!isValidObjectId(userId)) return sendError(res,"Invalid user!")

  const user = await User.findById(userId)
  if(!user) return sendError(res,"user not found") 

  if (user.isVerified) return sendError(res,"user is already verified!")

  const token = await EmailVerificationToken.findOne({owner: userId })
  if(!token) return sendError(res,"token not found!") 

  const isMatched = await token.compareToken(OTP)
  if(!isMatched) return sendError(res,"Please submit a valid OTP")

  user.isVerified = true
  await user.save();

  await EmailVerificationToken.findByIdAndDelete(token._id);

  var transport = generateTransporter()

  transport.sendMail({
    from: 'verification@reviewapp.com',
    to: user.email,
    subject: 'Welcome Email',
    html: '<h1>Welcome to our app and thanks for choosing us.</h1>'
  })

  res.json({message:'Successfully verified.'})
};

exports.resendEmailVerificationToken = async(req,res) => {
  const {userId} = req.body

  const user = await User.findById(userId)
  if(!user) return sendError(res,"user not found")

  if(user.isVerified) return sendError(res,"This email id is already verified!") 

  const alreadyHasToken = await EmailVerificationToken.findOne({owner: userId })
  if(alreadyHasToken) return sendError(res,"Only after one hour you can request for another token!")

  //generate 6 digit otp(one-time password)
  let OTP= generateOTP()

  const newEmailVerificationToken = new EmailVerificationToken({owner: user._id,token: OTP});

  await newEmailVerificationToken.save()

  var transport = generateTransporter()

  transport.sendMail({
    from:'verification@reviewapp.com',
    to: user.email,
    subject: 'Email Verification',
    html:
    `<p>Your Verification OTP</p>
    <h1>${OTP}</h1>`
  });

  res.json({message:'New OTP has send to your registered email account.'})
}

exports.forgetPassword = async(req,res)=>{
  const {email} = req.body;

  if(!email) return sendError(res,'Email is missing');

  const user = await User.findOne({email})
  if(!user) return sendError(res,'User not found!',404);

  const alreadyHasToken =  await PasswordResetToken.findOne({owner:user._id})
  if(alreadyHasToken) return sendError(res,"Only after one hour you can request for another token!")
}