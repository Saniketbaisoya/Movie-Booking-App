const express = require('express');
const { userAuthController } = require('../../controllers');
const { userAuthMiddleware } = require('../../middlewares');


const userAuthRouter = express.Router();

/**
 * http://localhost:9999/mba/v1/auth/signup
*/
userAuthRouter.post('/signup', userAuthMiddleware.userAuthValidation, userAuthController.signUp_controller);

/**
 * http://localhost:9999/mba/v1/auth/signin
*/
userAuthRouter.post('/signin', userAuthMiddleware.validSignInRequest, userAuthController.signIn_controller);

/**
 * http://localhost:9999/mba/v1/auth/reset
 * invoking the isAuthenticated + validateResetPassword middleware for authenticating and validating the data coming in request....
*/
userAuthRouter.patch('/reset', userAuthMiddleware.isAuthenticated, userAuthMiddleware.validateResetPassword, userAuthController.resetPassword_controller);

module.exports = userAuthRouter;