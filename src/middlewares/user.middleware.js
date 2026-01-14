const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

async function userValidation(req, res, next) {
    
    //validate the name in req.body
    if(!req.body.name){
        ErrorResponse.error = "Name is not present inside the user request !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the email in req.body
    if(!req.body.email){
        ErrorResponse.error = "email is not present inside the user request !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the password in req.body
    if(!req.body.password){
        ErrorResponse.error = "password is not present inside the user request !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}

async function validSignInRequest(req, res, next){
    // validate the email in req.body
    if(!req.body.email){
        ErrorResponse.error = "no email provied for sign in !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse); 
    }
    // validate the password in req.body
    if(!req.body.password){
        ErrorResponse.error = "no password provided for sign in !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse); 
    }
    next();
}
module.exports = {
    userValidation,
    validSignInRequest
};