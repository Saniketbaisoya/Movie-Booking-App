const express = require('express');
const { userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');


const userRouter = express.Router();

/**
 * http://localhost:9999/mba/v1/user/auth/signup
*/
userRouter.post('/auth/signup', userMiddleware.userValidation, userController.signUp_controller);

module.exports = userRouter;