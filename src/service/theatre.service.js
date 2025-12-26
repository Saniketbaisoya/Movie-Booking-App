const { StatusCodes } = require("http-status-codes");
const Theatre = require("../models/theatre.model");

/**
 * Now there is common flow here, which is if there is error related with properties/client related error
 * Then it will be handled by the service layer itself 
 * But if there is any other error which is related to server then this will be handled by the controller layer
 * Also the server related error is thrown by service but it is handled in controller layer
 */

async function createTheatre(payloadData){
    const { name, address, description } = payloadData;
    const dataPresent = await Theatre.findOne({name, address, description});
    if(dataPresent){
        return {err:"This theatre is already present",code: StatusCodes.UNPROCESSABLE_ENTITY};
    }
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

async function getTheatreById(id){
    const theatre = await Theatre.findById({_id: id});
    if(!theatre){
        return {
            err: "No theatre found for the given id",
            code: StatusCodes.NOT_FOUND
        }
    }
    return theatre;
}


module.exports = {
    createTheatre,
    getTheatreById
}