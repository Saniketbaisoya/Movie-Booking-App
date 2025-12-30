const express = require('express');
const { movieController } = require('../../controllers');
const { MovieMiddleWare } = require('../../middlewares');

const movieRouter = express.Router();


/**
 * http://localhost:9999/mba/api/v1/movies/
 * invoking the movieCreate_controller + createMovieMiddleware in movieRouter...
*/
movieRouter.post('/', MovieMiddleWare.validateMovieCreate, movieController.movieCreate_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the getMovieById_controller in movieRouter...
*/
movieRouter.get('/:movieId', movieController.getMovieById_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the deleteMovie_controller in movieRouter...
*/
movieRouter.delete('/:movieId', movieController.deleteMovie_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the updateMovie_controller in movieRouter...
*/
movieRouter.put('/:movieId',movieController.updateMovie_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the updateMovie_controller in movieRouter...
*/
movieRouter.patch('/:movieId',movieController.updateMovie_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the searchMovie_controller in movieRouter...
*/
movieRouter.get('/',movieController.searchMovie_controller);

module.exports = movieRouter;