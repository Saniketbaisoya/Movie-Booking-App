const { StatusCodes } = require("http-status-codes");
const { userService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

async function signUp_controller(req, res){
    try {
        const response = await userService.signUp(req.body);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully created the user !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
    
}

module.exports = {
    signUp_controller
}