const express = require('express');
const { movieController } = require('../../controllers');
const { CreateMovieMiddleWare } = require('../../middlewares');

const movieRouter = express.Router();


/**
 * http://localhost:9999/mba/api/v1/movies/
*/
movieRouter.post('/',CreateMovieMiddleWare , movieController.movieCreate_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
*/
movieRouter.get('/:movieId', movieController.getMovieById_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
*/
movieRouter.delete('/:movieId', movieController.deleteMovie_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
*/
movieRouter.put('/:movieId',movieController.updateMovie_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
*/
movieRouter.patch('/:movieId',movieController.updateMovie_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
*/
movieRouter.get('/',movieController.searchMovie_controller);

module.exports = movieRouter;