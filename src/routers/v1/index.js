const express = require('express');
const movieRouter = require('./movie-router');
const theatreRouter = require('./theatre.router');

const v1Router = express.Router();

/**
 * http://localhost:9999/mba/api/v1/movies
*/
v1Router.use('/movies',movieRouter); // invoking the movieRouter in v1Router...

/**
 * http://localhost:9999/mba/api/v1/theatre
*/
v1Router.use('/theatre',theatreRouter); // invoking the theatreRouter in v1Router...

module.exports = v1Router;