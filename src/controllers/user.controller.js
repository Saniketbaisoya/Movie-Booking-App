const { StatusCodes } = require("http-status-codes");
const { userService } = require("../service");
const { ErrorResponse, SuccessResponse } = require("../utils/common");

async function update_controller(req, res){
    try {
        const response = await userService.updateUserRoleOrUserStatus(req.body, req.params.id);

        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully update the user";
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
    update_controller
}