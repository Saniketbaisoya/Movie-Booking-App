const express = require('express');
const movieRouter = require('./movie-router');

const v1Router = express.Router();

/**
 * http://localhost:7000/mba/api/v1/movies
*/
v1Router.use('/movies',movieRouter);

module.exports = v1Router;