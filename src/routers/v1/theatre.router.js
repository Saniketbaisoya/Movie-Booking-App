const express = require('express');
const { theatreController } = require('../../controllers');

const theatreRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/theatre/
*/
theatreRouter.post('/',theatreController.createTheare_controller);

module.exports = theatreRouter;