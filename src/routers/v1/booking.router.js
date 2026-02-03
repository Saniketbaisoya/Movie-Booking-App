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

/**
 * http://localhost:9999/mba/api/v1/booking/
 */
bookingRouter.get('/', 
    userAuthMiddleware.isAuthenticated, 
    bookingController.getBookingById_controller
);

/**
 * http://localhost:9999/mba/api/v1/booking/all
 */
bookingRouter.get('/all', 
    userAuthMiddleware.isAuthenticated,
    userAuthMiddleware.isAdmin,
    bookingController.getAllBookings_controller
);

module.exports = bookingRouter;