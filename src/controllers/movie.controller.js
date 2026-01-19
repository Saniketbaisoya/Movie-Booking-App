const { movieService } = require('../service');
const { SuccessResponse, ErrorResponse } = require('../utils/common');
const {StatusCodes} = require('http-status-codes');


/**
 * Controller function that create the movie
 * @returns movie created
*/
async function movieCreate_controller(req, res) {
    try {
        const response = await movieService.createMovie(req.body);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully Created the movie !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            ErrorResponse.message = "The movie cannot be created !!";
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message 
        // here StatusCodes.UNPROCESSABLE_ENTITY is basically a 422 http-status-code
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ErrorResponse);
    }
}

async function getMovieById_controller(req,res){
    try {
        const response = await movieService.getMovieById(req.params.movieId);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetch the movie details !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}


async function deleteMovie_controller(req,res) {
    try {
        const response = await movieService.deleteMovie(req.params.movieId);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully delete the movie details !!";
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

async function updateMovie_controller(req,res){
    try {
        const response = await movieService.updateMovie(req.params.movieId, req.body);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully update the movie details !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = error.err;
            ErrorResponse.message = "The updates that we are trying to apply does'nt validate the schema";
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function searchMovie_controller(req,res){
    try{
        const response = await movieService.searchMovie(req.query);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetched the movies !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    }catch(error){
        if(error.err){
            ErrorResponse.error = error.err;
            ErrorResponse.message = "This movie is currently not present !!";
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}
module.exports = {
    movieCreate_controller,
    getMovieById_controller,
    deleteMovie_controller,
    updateMovie_controller,
    searchMovie_controller
}