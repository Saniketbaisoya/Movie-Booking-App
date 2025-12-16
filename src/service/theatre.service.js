const { StatusCodes } = require("http-status-codes");
const Theatre = require("../models/theatre.model");

async function createTheatre(payloadData){
    try {
        const response = await Theatre.create(payloadData);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] = error.errors[key].message
            });
            return {err: err, code: StatusCodes.UNPROCESSABLE_ENTITY};
        }else{
            console.log(error);
            throw error;
        }
    }
}

module.exports = {
    createTheatre
}