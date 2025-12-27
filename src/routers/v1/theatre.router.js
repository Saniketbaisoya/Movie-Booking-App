const express = require('express');
const { theatreController } = require('../../controllers');
const { TheatreMiddleware } = require('../../middlewares');

const theatreRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/theatre/
 * invoking the createTheare_controller + TheatreMiddleware in theatreRouter...
*/
theatreRouter.post('/', TheatreMiddleware, theatreController.createTheare_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id --> (id is urlParams)
 * invoking the getTheatreById_controller in theatreRouter...
*/
theatreRouter.get('/:id',theatreController.getTheatreById_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/
 * invoking the getAllTheatre_controller in theatreRouter...
*/
theatreRouter.get('/', theatreController.getAllTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id
 * invoking the deleteTheatre_controller in theatreRouter...
*/
theatreRouter.delete('/:id',theatreController.deleteTheatre_controller);

module.exports = theatreRouter;