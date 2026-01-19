const express = require('express');
const { movieController } = require('../../controllers');
const { MovieMiddleWare, userAuthMiddleware } = require('../../middlewares');

const movieRouter = express.Router();


/**
 * http://localhost:9999/mba/api/v1/movies/
 * invoking the movieCreate_controller + createMovieMiddleware + isAuthenticated + isAdminOrClient in movieRouter...
*/
movieRouter.post('/',
    userAuthMiddleware.isAuthenticated,
    userAuthMiddleware.isAdminOrClient,
    MovieMiddleWare.validateMovieCreate, 
    movieController.movieCreate_controller
);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the getMovieById_controller in movieRouter...
*/
movieRouter.get('/:movieId', movieController.getMovieById_controller);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the deleteMovie_controller + isAuthenticated + isAdminOrClient in movieRouter...
*/
movieRouter.delete('/:movieId', 
    userAuthMiddleware.isAuthenticated,
    userAuthMiddleware.isAdminOrClient,
    movieController.deleteMovie_controller
);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the updateMovie_controller + isAuthenticated + isAdminOrClient in movieRouter...
*/
movieRouter.put('/:movieId',
    userAuthMiddleware.isAuthenticated,
    userAuthMiddleware.isAdminOrClient,
    movieController.updateMovie_controller
);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the updateMovie_controller + isAuthenticated + isAdminOrClient in movieRouter...
*/
movieRouter.patch('/:movieId',
    userAuthMiddleware.isAuthenticated,
    userAuthMiddleware.isAdminOrClient,
    movieController.updateMovie_controller
);

/**
 * http://localhost:9999/mba/api/v1/movies/:movieId
 * invoking the searchMovie_controller in movieRouter...
*/
movieRouter.get('/',movieController.searchMovie_controller);

module.exports = movieRouter;