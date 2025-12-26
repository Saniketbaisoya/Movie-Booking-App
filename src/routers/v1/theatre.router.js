const express = require('express');
const { theatreController } = require('../../controllers');
const { TheatreMiddleware } = require('../../middlewares');

const theatreRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/theatre/
*/
theatreRouter.post('/', TheatreMiddleware, theatreController.createTheare_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id --> (id is urlParams)
*/
theatreRouter.get('/:id',theatreController.getTheatreById_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/
*/
theatreRouter.get('/', theatreController.getAllTheatre_controller);

/**
 * http://localhost:9999/mba/api/v1/theatre/:id
*/
theatreRouter.delete('/:id',theatreController.deleteTheatre_controller);

module.exports = theatreRouter;