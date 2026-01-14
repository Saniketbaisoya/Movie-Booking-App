const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model.js");

async function signUp(data){
    try {
        const response = await User.create(data);
        return response;
    } catch (error) {
        console.log(error);
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] = error.errors[key].message
            })
            throw {
                err: err,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            }
        }
        if(error.name == "MongoServerError"){
            if(error.errorResponse.keyPattern.name == 1){
                throw {
                    err: "This name is already present",
                    code: StatusCodes.UNPROCESSABLE_ENTITY
                }
                
            }
        }
        if(error.name == "MongoServerError"){
            if(error.errorResponse.keyPattern.email == 1){
                throw {
                    err: "This email is already present",
                    code: StatusCodes.UNPROCESSABLE_ENTITY
                }
                
            }
        }
        throw error;
    }
}

module.exports = {
    signUp
}