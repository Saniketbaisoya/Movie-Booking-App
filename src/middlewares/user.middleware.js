const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

async function userValidation(req, res, next) {
    
    //validate the name in req.body
    if(!req.body.name){
        ErrorResponse.message = "Name is not present inside the user request !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the email in req.body
    if(!req.body.email){
        ErrorResponse.message = "email is not present inside the user request !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the password in req.body
    if(!req.body.password){
        ErrorResponse.message = "password is not present inside the user request !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    next();
}
module.exports = {
    userValidation
};