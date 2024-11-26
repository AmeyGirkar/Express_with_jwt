const express = require('express');
const {signup,signin,getuser } = require('../controller/authController')
const jwtAuth = require('../middleware/jwtAuth')
const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.get('/user',jwtAuth,getuser)

module.exports = authRouter