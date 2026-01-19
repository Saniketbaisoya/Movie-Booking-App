const express = require('express');
const { userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');
const userRouter = express.Router();

/**
 * http://localhost:9999/mba/api/v1/user/:id
*/
userRouter.patch('/:id', userMiddleware.validateUpdateUserData, userController.update_controller);

module.exports = userRouter;