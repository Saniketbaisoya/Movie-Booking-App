const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const ObjectId = require('mongoose').Types.ObjectId;

async function validateCreateShowRequest(req, res, next){
    if(!req.body.theatreId){
        ErrorResponse.error = "no theatreId is provided !!";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    if(!ObjectId.isValid(req.body.theatreId)){
        ErrorResponse.error = "invalid theatreId provided !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.movieId){
        ErrorResponse.error = "no movieId is provided !!";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    if(!ObjectId.isValid(req.body.movieId)){
        ErrorResponse.error = "invalid movie id provided !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    if(!req.body.timings){
        ErrorResponse.error = "no timings provided !!";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    if(!req.body.noOfSeats){
        ErrorResponse.error = "no seats info provided !!";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }

    if(!req.body.price){
        ErrorResponse.error = "no price information provided !!";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
    next();
}
module.exports = {
    validateCreateShowRequest
}