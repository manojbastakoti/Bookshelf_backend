const cors =require("cors")
const cookieParser = require("cookie-parser");
const express= require("express")
const app=express();
require("./Database/connection");
const {getUsers,addUser,loginUser}=require("./Handler/userHandler");
const { authenticateToken } = require("./middleware/authenticate");


app.use(cors({credentials:true ,origin:"http://localhost:5173"}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//user
app.get("/users",authenticateToken ,getUsers);
app.post('/user/add',addUser);
app.post('/user/login',loginUser);


const port=8000;
app.listen(port, function(){
    console.log("Server listening on port" +port);
})