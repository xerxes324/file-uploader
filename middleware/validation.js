const {body,validationResult} = require('express-validator');

exports.validateUsername = [
    body("username")
    .trim()
    .notEmpty().withMessage("Username cannot be empty.")
    .matches(/^[a-zA-Z0-9_]+$/).withMessage("Username must be alphanumeric.")
    .custom((value,{req}) =>{
        if ( value.toLowerCase() === req.body.signuppassword ){
            throw new Error("Username and password cannot be the same.");
        }
        return true;
    })
]


exports.validateEmail = [
    body("email")
    .trim()
    .notEmpty().withMessage("Email field cannot be empty")
    .isEmail().withMessage("Please enter a valid email")
    .matches(/^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/).withMessage("Please enter a valid email.")
    .normalizeEmail()
]


exports.validatePassword = [
    body("signuppassword")
    .notEmpty().withMessage("Please enter a password")
    .isLength({min:6}).withMessage("The password must be atleast 6 characters")
]

exports.confirmPassword = [

    body("confirmpassword")
    .notEmpty().withMessage("Please confirm your password")
]

exports.passwordMatch = [
    body("signuppassword")
    .custom((value, {req}) => {
        console.log("matching..");
        if ( value !== req.body.confirmpassword){
            throw new Error("Passwords dont't match")
        }
        return true;
    })
]

exports.validateResult = (req,res,next) => {
    const errors = validationResult(req);
    if ( !errors.isEmpty()){
        console.log(errors, "is the errors array.");
        next(errors.array());
    }
    else{
        next();
    }
}