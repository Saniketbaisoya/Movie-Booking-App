const express = require('express');
const { showController } = require('../../controllers');
const { showMiddleware, userAuthMiddleware } = require('../../middlewares');

const showRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/show/
*/
showRouter.post('/', 
    userAuthMiddleware.isAuthenticated,
    userAuthMiddleware.isAdminOrClient,
    showMiddleware.validateCreateShowRequest, 
    showController.createShow_controller
);

module.exports = showRouter;