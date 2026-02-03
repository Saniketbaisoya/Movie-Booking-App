const mongoose = require('mongoose');
const { BOOKING_STATUS } = require('../utils/constants');

const bookingSchema = new mongoose.Schema({
    theatreId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Theatre'
    },
    movieId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Movie'
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    timings: {
        type: String,
        required: true
    },
    noOfSeats: {
        type: Number,
        required: true
    },
    totalCost: {
        type: Number,
        required: true
    },
    // Now yha enum important hai kyuki yeah define krta hai ki parameter ki values kon kon si hogi...
    // Also ek important thing is ki enum mai values define krte hai, and if values are more than the one then unko array format mai dege and string mai isliye kyuki status ka type string hain....
    // Now agr status ki value enum ke kisi bhi values se match nhi hoti, then in that case hmm message property ko assign kr dege status mai, isliye message important hain...
    status: {
        type: String,
        required: true,
        enum: {
            values: [BOOKING_STATUS.in_process, BOOKING_STATUS.cancelled, BOOKING_STATUS.successfull],
            message: 'Invalid booking status'
        },
        default: BOOKING_STATUS.in_process
    }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;