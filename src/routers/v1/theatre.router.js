const express = require('express');
const { theatreController } = require('../../controllers');
const { TheatreMiddleware } = require('../../middlewares');

const theatreRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/theatre/
*/
theatreRouter.post('/', TheatreMiddleware.validateTheatreCreate, theatreController.createTheare_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id --> (id is urlParams)
*/
theatreRouter.get('/:id',theatreController.getTheatreById_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id/movies
*/
theatreRouter.patch('/:id/movies', TheatreMiddleware.validateUpdateMovieInTheatreParams, theatreController.updateMovieInTheatre_controller);

module.exports = theatreRouter;