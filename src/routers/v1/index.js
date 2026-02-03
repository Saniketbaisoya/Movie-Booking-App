const express = require('express');
const movieRouter = require('./movie-router');
const theatreRouter = require('./theatre.router');
const userAuthRouter = require('./userAuth.router');
const userRouter = require('./user.router');
const bookingRouter = require('./booking.router');

const v1Router = express.Router();

/**
 * http://localhost:9999/mba/api/v1/movies
*/
v1Router.use('/movies',movieRouter); // invoking the movieRouter in v1Router...

/**
 * http://localhost:9999/mba/api/v1/theatre
*/
v1Router.use('/theatre',theatreRouter); // invoking the theatreRouter in v1Router...

/**
 * http://localhost:9999/mba/api/v1/auth
*/
v1Router.use('/auth', userAuthRouter); // invoking the userAuthRouter in v1Router...

/**
 * http://localhost:9999/mba/api/v1/user
 */
v1Router.use('/user', userRouter); // invoking the userRouter in v1Router....

/**
 * http://localhost:9999/mba/api/v1/booking
 */
v1Router.use('/booking', bookingRouter); // invoking the bookingRouter in v1Router....

module.exports = v1Router;