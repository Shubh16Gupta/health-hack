const mongoose = require("mongoose");

require("dotenv").config();

exports.connect = () =>{
    mongoose.connect(process.env.MONGODB_URL)

    .then (() =>{console.log("DataBase is connected Successfully")})
    .catch ((err)=>{
        console.log("db connection issue");
        console.error(err);
        process.exit(1);
    });
}