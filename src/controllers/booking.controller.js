const { StatusCodes } = require("http-status-codes");
const { BookingService } = require("../service");
const { SuccessResponse, ErrorResponse } = require("../utils/common");

/**
 *  -> let userId = req.user include into the re.body , {...req.body, userId: userId} isse hmm new alg se bni hui field(userId)
 *  usko hmm include kr skte hain in req.body ke data mai
 * @param {*} req => theatreId, movieId, timings, status, totalCost, noOfSeats
 * @param {*} res => SuccessResponse and statusCodes.CREATED
 */
async function createBooking_Controller(req, res) {
    try {
        let userId = req.user;
        const response = await BookingService.createBooking({...req.body, userId: userId});
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully created the booking !!";
        return res.status(StatusCodes.CREATED).json(SuccessResponse);
    } catch (error) {
        if(error.err){
            ErrorResponse.error = err;
            ErrorResponse.message = "Booking cannot be created !!";
            return res.status(error.code).json(ErrorResponse);
        }
        ErrorResponse.error = error;
        ErrorResponse.message = error.message;
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(ErrorResponse);
    }
}

async function updateBooking_controller(req, res) {
    try {
        const response = await BookingService.updateBooking(req.params.id, req.body);
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully updated the bookings !!";
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

async function getBookingById_controller(req, res) {
    try {
        const response = await BookingService.getBookingById({userId: req.user});
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetched all user bookings !!";
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

async function getAllBookings_controller(req, res) {
    try {
        const response = await BookingService.getAllBookings();
        SuccessResponse.data = response;
        SuccessResponse.message = "SuccessFully fetched all bookings !!";
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
    createBooking_Controller,
    updateBooking_controller,
    getBookingById_controller,
    getAllBookings_controller
}