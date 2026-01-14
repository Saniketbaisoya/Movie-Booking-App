const { StatusCodes } = require("http-status-codes");
const { userService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = require("../configuration/serverConfig");

async function signUp_controller(req, res){
    try {
        const response = await userService.signUp(req.body);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully created the user !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
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

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @returns 
 * When i do this console.log(jwt.verify(token, SECRET_KEY)); => 
 *  @returns {
        id: '6967723e58548eff7fc02e26',
        email: 'sanibaisoya001@gmail.com',
        iat: 1768424773,
        exp: 1768428373
    }
 * Here the iat is issued at the the time jb token issued hua hain....
 * Also there is exp time jo yeah btayega ki yeah token ki expiry kb tk hain....
*/
async function signIn_controller(req, res){
    try {
        const user = await userService.getUserByEmail(req.body.email);
        const isValidPassword = await user.validPassword(req.body.password);
        if(!isValidPassword){
            throw {
                err: "Invalid Password for the given email !!",
                code: StatusCodes.BAD_REQUEST
            }
        }
        const token = await jwt.sign({id: user.id, email: user.email}, SECRET_KEY, {expiresIn: '1h'});
        console.log(jwt.verify(token, SECRET_KEY));
        SuccessResponse.message = "SuccessFully logged in";
        SuccessResponse.data = {
            email: user.email,
            role: user.userRole,
            status: user.userStatus,
            token: token
        }
        return res.status(StatusCodes.OK).json(SuccessResponse);
    } catch (error) {
        /**
         * Yani agr hmm kuch bhi throw krege from service or everywhere it is by default come in catch statement....
         * Isliye yeah err ka case catch mai handle kiya na ki try mai....
         */
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
    signUp_controller,
    signIn_controller
}