const mongoose = require('mongoose');

const MONGODB_URL =process.env.MONGODB_URL || "mongodb://localhost:27017"

const dbConnect = ()=>{
    mongoose
    .connect(MONGODB_URL)
    .then((con) =>console.log(`connected to ${con.connection.host}`))
    .catch((error) => console.log(error.message));
}

module.exports = dbConnect;
