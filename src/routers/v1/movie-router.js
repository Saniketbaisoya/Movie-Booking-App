const express = require('express');
const { movieController } = require('../../controllers');

const movieRouter = express.Router();


/**
 * http://localhost:7000/mba/api/v1/movies/
*/
movieRouter.post('/',movieController.movieCreate_controller);

/**
 * http://localhost:7000/mba/api/v1/movies/:movieId
*/
movieRouter.get('/:movieId', movieController.getMovieById_controller);

module.exports = movieRouter;