const express = require('express');
const { bookingController } = require('../../controllers');
const { bookingMiddleware, userAuthMiddleware } = require('../../middlewares');

const bookingRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/booking/
 */
bookingRouter.post('/', 
    userAuthMiddleware.isAuthenticated, 
    bookingMiddleware.validateBookingCreateRequest, 
    bookingController.createBooking_Controller
);

/**
 * http://localhost:9999/mba/api/v1/booking/:id
 */
bookingRouter.patch('/:id', bookingController.updateBooking_controller);

module.exports = bookingRouter;