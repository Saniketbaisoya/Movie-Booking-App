const express = require('express');
const { theatreController } = require('../../controllers');
const { TheatreMiddleware, userAuthMiddleware } = require('../../middlewares');

const theatreRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/theatre/
 * invoking the createTheare_controller + isAuthenticated + isAdminOrClient + TheatreMiddleware in theatreRouter...
*/
theatreRouter.post('/', userAuthMiddleware.isAuthenticated, userAuthMiddleware.isAdminOrClient, TheatreMiddleware.validateTheatreCreate, theatreController.createTheare_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/
 * invoking the getAllTheatre_controller in theatreRouter...
*/
theatreRouter.get('/',theatreController.getAllTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id --> (id is urlParams)
 * invoking the getTheatreById_controller in theatreRouter...
*/
theatreRouter.get('/:id',theatreController.getTheatreById_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id/movies
*/
theatreRouter.patch('/:id/movies', TheatreMiddleware.validateUpdateMovieInTheatreParams, theatreController.updateMovieInTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id
 * invoking the deleteTheatre_controller + isAuthenticated + isAdminOrClient in theatreRouter...
*/
theatreRouter.delete('/:id', userAuthMiddleware.isAuthenticated, userAuthMiddleware.isAdminOrClient, theatreController.deleteTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id
 * invoking the updateTheatre_controller + isAuthenticated + isAdminOrClient in theatreRouter...
*/
theatreRouter.patch('/:id',userAuthMiddleware.isAuthenticated, userAuthMiddleware.isAdminOrClient, theatreController.updateTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id
 * invoking the updateTheatre_controller + isAuthenticated + isAdminOrClient in theatreRouter...
*/
theatreRouter.put('/:id',userAuthMiddleware.isAuthenticated, userAuthMiddleware.isAdminOrClient, theatreController.updateTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id/movies
 * invoking the updateTheatre_controller in theatreRouter...
*/
theatreRouter.get('/:id/movies',theatreController.getAllMoviesInTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:theatreId/movies/:movieId
 * invoking the checkMovieInTheatre_controller in theatreRouter...
*/
theatreRouter.get('/:id/movies',theatreController.checkMovieInTheatre_controller);
module.exports = theatreRouter;