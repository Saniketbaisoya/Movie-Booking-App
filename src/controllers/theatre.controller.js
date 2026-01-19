const { StatusCodes } = require("http-status-codes");
const { theatreService } = require("../service");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createTheare_controller(req,res){
    try {
        const payloadData = req.body;
        const response = await theatreService.createTheatre(payloadData);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully created the theatre !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            ErrorResponse.message = "Validation failed on few parameters of the request body";
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = "Not able to create the movie due to server error";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllTheatre_controller(req,res){
    try {
        const response = await theatreService.getAllTheatre(req.query);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetched the  theatre!!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getTheatreById_controller(req,res){
    try {
        const response = await theatreService.getTheatreById(req.params.id);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetched the theatre !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateMovieInTheatre_controller(req, res) {
    try {
        const response = await theatreService.updateMovieInTheatre(
            req.params.id,
            req.body.movieIds,
            req.body.insert
        );
        SuccessResponse.data = response;
        if(req.body.insert) SuccessResponse.message = "SuccessFully Adding the Movie in Theatre !!"
        else SuccessResponse.message = "SuccessFully Removing the Movie from Theatre !!"
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function deleteTheatre_controller(req,res){
    try {
        const response = await theatreService.deleteTheatre(req.params.id);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully delete the theatre !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.err = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateTheatre_controller(req,res){
    try {
        const response = await theatreService.updateTheatre(req.params.id, req.body);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully updated the theatre !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function getAllMoviesInTheatre_controller(req,res){
    try {
        const response = await theatreService.getAllMoviesInTheatre(req.params.id);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetched all movies in the given Theatre with the given id !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function checkMovieInTheatre_controller(req, res){
    try {
        const response = await theatreService.checkMovieInTheatre(req.params.theatreId, req.params.movieId);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully checked this movie is in this theatre present or not !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
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
    createTheare_controller,
    getAllTheatre_controller,
    getTheatreById_controller,
    deleteTheatre_controller,
    updateTheatre_controller,
    updateMovieInTheatre_controller,
    getAllMoviesInTheatre_controller,
    checkMovieInTheatre_controller
}