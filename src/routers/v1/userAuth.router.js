const express = require('express');
const { userAuthController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');


const userAuthRouter = express.Router();

/**
 * http://localhost:9999/mba/v1/auth/signup
*/
userAuthRouter.post('/signup', userMiddleware.userValidation, userAuthController.signUp_controller);

/**
 * http://localhost:9999/mba/v1/auth/signin
*/
userAuthRouter.post('/signin', userMiddleware.validSignInRequest, userAuthController.signIn_controller);

/**
 * http://localhost:9999/mba/v1/auth/reset
*/
userAuthRouter.patch('/reset', userMiddleware.isAuthenticated, userAuthController.resetPassword_controller);

module.exports = userAuthRouter;