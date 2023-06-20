const cors =require("cors")
const cookieParser = require("cookie-parser");
const express= require("express")
const app=express();
require("./Database/connection");
const {getUsers,addUser,loginUser, changePassword,getProfile, googleLogin}=require("./Handler/userHandler");
const {getBlogs,addBlog,editBlog, deleteBlog, getBlogById, addViews}=require("./Handler/blogHandler");
const { authenticateToken } = require("./middleware/authenticate");
const fileUpload = require("express-fileupload");
const { getBooks, addBook } = require("./Handler/bookHandler");
const { addComment, getComments } = require("./Handler/commentHandler");


app.use(cors({credentials:true ,origin:"http://localhost:5173"}))
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())
app.use(fileUpload())

app.use("/uploads" ,express.static("uploads"));

//user
app.get("/users",authenticateToken ,getUsers);
app.post('/user/add',addUser);
app.post('/user/login',loginUser);
app.post("/user/google-login", googleLogin);

//Profile_info
app.post("/profile_info",authenticateToken,getProfile);

//changePassword
app.patch('/user/changepassword/:id',changePassword);

//blog
app.get("/blogs/:pageNumber",getBlogs)
app.get("/blog/:id", getBlogById)
app.post("/blog/add",addBlog)
app.put("/blog/edit/:id",authenticateToken,editBlog)
app.delete("/blog/delete/:id",authenticateToken,deleteBlog)

// add views
app.post("/article-add-views/:id", addViews);

// comments
app.post("/comment/add", authenticateToken, addComment);
app.get("/comment/:blogId", getComments);

//book
app.get("/books",getBooks);
app.post("/book/add",addBook);


const port=8000;
app.listen(port, function(){
    console.log("Server listening on port" +port);
})