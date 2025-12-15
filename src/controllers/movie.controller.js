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
        if(response.err){ // true
            ErrorResponse.error = err;
            ErrorResponse.message = "The movie cannot be created !!";
            return res.status(response.code).json(ErrorResponse);
        }
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully Created the movie !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
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
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateMovie_controller(req,res){
    try {
        const response = await movieService.updateMovie(req.params.movieId, req.body);
        // yha hmne voh client side error ko yha dekha hai and server error yani voh error jo throw hoga, usko hmne catch mai dekh liya hain....
        if(response.err){
            ErrorResponse.error = response.err;
            ErrorResponse.message = "The updates that we are trying to apply does'nt validate the schema";
            return res.status(response.code).json(ErrorResponse);
        }
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully update the movie details !!";
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async funtion searchMovie_con
module.exports = {
    movieCreate_controller,
    getMovieById_controller,
    deleteMovie_controller,
    updateMovie_controller
}