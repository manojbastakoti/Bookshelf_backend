const mongoose = require("mongoose")
require('dotenv').config()

const dbConnection = async(req,res)=>{
    try {
        await mongoose.connect(process.env.URL_CONNECT)
        console.log("Database connection successfull")
    } catch (error) {
        console.log(error)
    }
};
dbConnection();