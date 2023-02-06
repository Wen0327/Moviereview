const {check, validationResult} = require("express-validator");

exports.userValidator = [
    check('name').trim().not().isEmpty().withMessage('Name is missing!'),
    check('email').normalizeEmail().isEmail().withMessage('Email is invalid!'),
    check('password').trim().not().isEmpty().withMessage('Password is missing!').isLength({min:5,max:20}).withMessage('password must be 5 to 20 characters long!')
];

exports.validPassword = [check("newPassword").trim().not().isEmpty().withMessage('Password is missing!').isLength({min:5,max:20}).withMessage('password must be 5 to 20 characters long!')]


exports.validate = (req,res,next)=>{
    const error = validationResult(req).array();
    if(error.length){
        return res.json({error:error[0].msg})
    }

    next();
}
