const { StatusCodes } = require("http-status-codes");
const { ErrorResponse } = require("../utils/common");

async function validateUpdateUserData(req, res){
    if(!req.body.userRole || !req.body.userStatus){
        ErrorResponse.error = "Malformed request, please send atleast one parameter for updation !!";
        return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(ErrorResponse);
    }
}

module.exports = {
    validateUpdateUserData
}