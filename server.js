const cors =require("cors")
const cookieParser = require("cookie-parser");
const express= require("express")
const app=express();
require("./Database/connection");
const {getUsers,addUser,loginUser, changePassword,getProfile, googleLogin, getUserById, deleteUserById, adminLogin, getWishlist, userCart, getUserCart, emptyCart}=require("./Handler/userHandler");
const {getBlogs,addBlog,editBlog, deleteBlog, getBlogById, addViews}=require("./Handler/blogHandler");
const { authenticateToken, isAdmin } = require("./middleware/authenticate");
const fileUpload = require("express-fileupload");
const { getBooks, addBook, getBookById, updateBook, deleteBookById, addToWishlist, rating } = require("./Handler/bookHandler");
const { addComment, getComments } = require("./Handler/commentHandler");
const { getPopularBooks, getPopularBooksById } = require("./Handler/popularBooksHandler");
const { getGenre, createGenre } = require("./Handler/genreHandler");


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
app.post("/user/admin-login",adminLogin)
app.post("/user/google-login", googleLogin);
app.get("/get-user/:id",authenticateToken, isAdmin, getUserById);
app.post('/cart',authenticateToken,userCart)
app.get("/user-cart",authenticateToken,getUserCart);
app.delete("/empty-cart",authenticateToken,emptyCart)
app.get("/wishlist",authenticateToken, getWishlist);
app.delete("/deleteUser/:id",deleteUserById);


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
app.get("/book/:id",getBookById);
app.put("/book/update/:id",updateBook);
app.delete("/book/delete/:id",deleteBookById)
app.put("/wishlist",authenticateToken,addToWishlist)
app.put("/rate",authenticateToken,rating)


//genre
app.get("/genre",getGenre);
app.post("/genre/add",createGenre)


//popularBooks
app.get("/popularBooks",getPopularBooks)
app.get("/popularBook/:id",getPopularBooksById)



const port=8000;
app.listen(port, function(){
    console.log("Server listening on port" +port);
})