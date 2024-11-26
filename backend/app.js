const express = require('express');
const authRouter = require('./router/authRoute.js');
const dbConnect = require('./config/dbConnection.js');
const cookieParser = require('cookie-parser');

const app = express();

dbConnect();

app.use(express.json());
app.use(cookieParser());

// app.use(express.urlencoded({extended:false}))
// app.use(express.text)
app.use('/api/auth',authRouter);

app.use('/',(req,res)=>{
    res.status(200).json({
        data:"server"
    })

});

module.exports = app;
