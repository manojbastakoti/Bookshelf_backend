const { urlencoded } = require("express");
const express= require("express")
const app=express();
require("./Database/connection");
const {getUsers,addUser,loginUser}=require("./Handler/userHandler")


app.use(express.urlencoded({extended:true}))
app.use(express.json())

//user
app.get("/users",getUsers);
app.post('/user/add',addUser);
app.post('/user/login',loginUser);


const port=8000;
app.listen(port, function(){
    console.log("Server listening on port" +port);
})