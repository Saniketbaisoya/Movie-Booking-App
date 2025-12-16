const { StatusCodes } = require("http-status-codes");
const { theatreService } = require("../service");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function createTheare_controller(req,res){
    try {
        const payloadData = req.body;
        const response = await theatreService.createTheatre(payloadData);
        if(response.err){
            ErrorResponse.error = response.err;
            ErrorResponse.message = "Validation failed on few parameters of the request body";
            return res.status(response.code).json(ErrorResponse);
        }
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully created the movie !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = "Not able to create the movie due to server error";
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createTheare_controller
}