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

/**
 * Now data mai userId hi isliye li kyuki jis user ne login kiya hua hoga, uski sari bookings hme chahiye usne jo booking create kri hain....
 * Apne ap ko authenticate krke, Now userId hme again isAuthenticated ke middleware se hi milegi...
 * @param {*} data => userId
*/
async function getBookingById(data){
    try {
        const response = await Booking.find({ userId: data.userId });
        if(!response){
            throw {
                err: "No booking found for the given user !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getAllBookings() {
    try {
        const response = await Booking.find();
        if(!response){
            throw {
                err: "No booking found !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    createBooking,
    updateBooking,
    getBookingById,
    getAllBookings
}