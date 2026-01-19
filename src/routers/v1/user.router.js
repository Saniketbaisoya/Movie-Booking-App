const express = require('express');
const { userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');


const userRouter = express.Router();

/**
 * http://localhost:9999/mba/v1/user/auth/signup
*/
userRouter.post('/auth/signup', userMiddleware.userValidation, userController.signUp_controller);

/**
 * http://localhost:9999/mba/v1/user/auth/signin
*/
userRouter.post('/auth/signin', userMiddleware.validSignInRequest, userController.signIn_controller);

/**
 * http://localhost:9999/mba/v1/user/auth/reset
*/
userRouter.patch('/auth/reset', userMiddleware.isAuthenticated, userController.resetPassword_controller);

module.exports = userRouter;