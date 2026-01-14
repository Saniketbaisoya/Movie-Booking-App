const express = require('express');
const { userController } = require('../../controllers');


const userRouter = express.Router();

/**
 * http://localhost:9999/mba/v1/user/auth/signup
*/
userRouter.post('/auth/signup', userController.signUp_controller);

module.exports = userRouter;