const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

async function validateTheatreCreate(req,res,next){
    if(!req.body.name){
        ErrorResponse.error = "The name of the theatre is required !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.pincode){
        ErrorResponse.error = "The pincode of the theatre should be mentioned !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    if(!req.body.city){
        ErrorResponse.error = "The city of the theatre is required !!"
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }
    // if(!req.body.descriptiom){
    //     ErrorResponse.error = "The descriptiom of the theatre is required !!"
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    // }
    // if(!req.body.address){
    //     ErrorResponse.error = "The address of the theatre is required !!"
    //     return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    // }
    next();
}
module.exports = validateTheatreCreate;