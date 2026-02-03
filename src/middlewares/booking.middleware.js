const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");
const { theatreService } = require("../service");
const ObjectId = require('mongoose').Types.ObjectId;

async function validateBookingCreateRequest(req, res, next) {
    // validate the incoming theatreId
    if(!req.body.theatreId){
        ErrorResponse.error = "No theatreId provided !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the correct format of theatreId
    if(!ObjectId.isValid(req.body.theatreId)){
        ErrorResponse.error = "Invalid theatreId provided !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // check if the theatreId exists or not
    const theatre = await theatreService.getTheatreById(req.body.theatreId);
    if(!theatre){
        ErrorResponse.error = "No theatre found for the given id !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the incoming movieId
    if(!req.body.movieId){
        ErrorResponse.error = "No movieId provided !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the correct format of movieId
    if(!ObjectId.isValid(req.body.movieId)){
        ErrorResponse.error = "Invalid movieId provided !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // check if this movieId is present inside the theatre or not ?
    if(theatre.movies.indexOf(req.body.movieId) == -1){
        ErrorResponse.error = "Given movie is not available in the requested theatre !!";
        return res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the incoming timing of movie
    if(!req.body.timings){
        ErrorResponse.error = "No movie timing is present !!";
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // validate the incoming seats
    if(!req.body.noOfSeats){
        ErrorResponse.error = "No seat provided !!";
        res.status(StatusCodes.BAD_REQUEST).json(ErrorResponse);
    }

    // request is correct...
    next();

}

module.exports = {
    validateBookingCreateRequest
}