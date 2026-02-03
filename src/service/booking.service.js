const { StatusCodes } = require("http-status-codes");
const Booking = require("../models/booking");

async function createBooking(data) {
    try {
        const response = await Booking.create(data);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            })
            throw {
                err: err,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            }
        }
    }
}

async function updateBooking(id, data){
    try {
        const response = await Booking.findByIdAndUpdate(id, data, {new: true, runValidators: true});
        if(!response){
            throw {
                err: "No booking found for the given id !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach(key => {
                err[key] = error.errors[key].message;
            })
            throw {
                err: err,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            }
        }
    }
}
module.exports = {
    createBooking,
    updateBooking
}