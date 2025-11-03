const express = require('express');
const { movieController } = require('../../controllers');

const movieRouter = express.Router();


/**
 * http://localhost:7000/mba/api/v1/movies/
*/
movieRouter.post('/',movieController.movieCreate_controller);

module.exports = movieRouter;