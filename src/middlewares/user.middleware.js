const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configuration/serverConfig");
const { userService } = require("../service");

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

async function isAuthenticated(req, res, next){
    try {
        const token = req.headers['access-token'];
        if(!token){
            ErrorResponse.error = "no token provided !!";
            return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
        }
        const response = await jwt.verify(token, SECRET_KEY);
        if(!response){
            ErrorResponse.error = "Token not verified !!";
            return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }
        const user = await userService.getUserById(response.id);
        req.user = user.id;
        next();
    } catch (error) {
        if(error.name == 'JsonWebTokenError'){
            ErrorResponse.error = error.message;
            return res.status(StatusCodes.UNAUTHORIZED).json(ErrorResponse);
        }
        
        if(error.err){
            ErrorResponse.error = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    userValidation,
    validSignInRequest,
    isAuthenticated
};