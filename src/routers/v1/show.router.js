const express = require('express');
const { showController } = require('../../controllers');
const { showMiddleware } = require('../../middlewares');

const showRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/show/
 */
showRouter.post('/', showMiddleware.validateCreateShowRequest, showController.createShow_controller);

module.exports = showRouter;