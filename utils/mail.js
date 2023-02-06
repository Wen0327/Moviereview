const nodemailer = require('nodemailer')
exports.generateOTP = (otp_len = 6) => {

  let OTP = "";
  for (let i = 1; i <= otp_len; i++) {
    const randomVal = Math.round(Math.random() * 9);
    OTP += randomVal;
  }

  return OTP
};

exports.generateTransporter = ()=>

    nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "68fcbbc3961b99",
          pass: "eb56828623d5b7"
        }
      });
