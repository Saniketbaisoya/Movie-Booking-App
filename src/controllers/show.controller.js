const { StatusCodes } = require("http-status-codes");
const { ErrorResponse, SuccessResponse } = require("../utils/common");
const { showService } = require("../service");

async function createShow_controller(req, res){
    try {
        const response = await showService.createShow(req.body);
        SuccessResponse.message = "SuccessFully Created the new show !!";
        SuccessResponse.data = response;
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = err;
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

module.exports = {
    createShow_controller
}