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
    if(!req.body.address){
        ErrorResponse.error = "The address of the theatre is required !!"
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

async function validateUpdateMovieInTheatreParams(req, res, next) {
    if(req.body.insert == undefined){
        ErrorResponse.message = "The insert parameter is missing in the request !!";
        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
    if(!req.body.movieIds || !(req.body.movieIds instanceof Array) || req.body.movieIds.length <= 0){
        if(!req.body.movieIds) ErrorResponse.message = "No movies present in the request to be updated in theatre !!";
        if(!(req.body.movieIds instanceof Array)) ErrorResponse.message = "Expected array of movies but found something else !!";
        if(req.body.movieIds.length <= 0) ErrorResponse.message = "No movie present in the array provided !!"

        return res.status(StatusCodes.NOT_FOUND).json(ErrorResponse);
    }
    next();
}

module.exports = {
    validateTheatreCreate,
    validateUpdateMovieInTheatreParams
};