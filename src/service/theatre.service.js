const { StatusCodes } = require("http-status-codes");
const Theatre = require("../models/theatre.model");

async function createTheatre(payloadData){
    const dataPresent = await Theatre.find(payloadData);
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

async function getAllTheatre(){
    const response = await Theatre.find();
    return response;
}

async function deleteTheatre(id){
    const findFirst = await Theatre.findOne({_id: id});
    if(!findFirst){
        return{
            err: "No theatre found for the given id",
            code: StatusCodes.NOT_FOUND
        }
    }
    const response = await Theatre.deleteOne({_id: id});
    if(response.deletedCount == 0){
        return{
            err: 'No theatre is presnt for further deletion !!',
            code: StatusCodes.NOT_ACCEPTABLE
        }
    }
    return response;
}
module.exports = {
    createTheatre,
    getTheatreById,
    getAllTheatre,
    deleteTheatre
}