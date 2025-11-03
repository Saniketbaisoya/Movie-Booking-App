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
        ErrorResponse.error = error;
        ErrorResponse.message = error.message 
        // here StatusCodes.UNPROCESSABLE_ENTITY is basically a 422 http-status-code
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ErrorResponse);
    }
}
module.exports = {
    movieCreate_controller,
}