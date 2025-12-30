const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../utils/common");

async function validateMovieCreate(req, res, next) {
    // validate the name...
    if(!req.body.name){
        BadRequestError.error = "The name of the movie is not present in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(BadRequestError);
    }
    // // validate the description...
    if(!req.body.description){
        BadRequestError.error = "The description of the movie is not present in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(BadRequestError);
    }
    // validate the casts...
    if(!req.body.casts || !(req.body.casts instanceof Array) || req.body.casts.length <= 0){
        console.log(req.body.casts instanceof Array);
        console.log(req.body.casts.length)
        BadRequestError.error = "The casts of the movie is not present in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(BadRequestError);
    }
    // validate the trailerUrl...
    if(!req.body.trailerUrl || !(req.body.trailerUrl instanceof Array) || req.body.trailerUrl.length <= 0){
        BadRequestError.error = "The trailerUrl of the movie is not present in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(BadRequestError);
    }
    // validate the releaseDate...
    if(!req.body.releaseDate){
        BadRequestError.error = "The releaseDate of the movie is not present in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(BadRequestError);
    }
    // validate the  director...
    if(!req.body.director){
        BadRequestError.error = "The  director of the movie is not present in the request";
        return res.status(StatusCodes.BAD_REQUEST).json(BadRequestError);
    }
    next();
    
}
module.exports = {
    validateMovieCreate
};