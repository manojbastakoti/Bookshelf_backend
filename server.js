const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
require("./Database/connection");
const {
  getUsers,
  addUser,
  loginUser,
  changePassword,
  getProfile,
  googleLogin,
  getUserById,
  deleteUserById,
  adminLogin,
  getWishlist,
  userCart,
  getUserCart,
  emptyCart,
  createOrder,
  getOrders,
  removeProductFromCart,
  popularUserCart,
  getALLOrders,
  createPopularBookOrder,
} = require("./Handler/userHandler");
const {
  getBlogs,
  addBlog,
  editBlog,
  deleteBlog,
  getBlogById,
  addViews,
} = require("./Handler/blogHandler");
const { authenticateToken, isAdmin } = require("./middleware/authenticate");
const fileUpload = require("express-fileupload");
const {
  getBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBookById,
  addToWishlist,
  rating,
  searchByQueryType,
} = require("./Handler/bookHandler");
const { addComment, getComments } = require("./Handler/commentHandler");
const {
  getPopularBooks,
  getPopularBooksById,
  addPopularBooksToWishlist,
} = require("./Handler/popularBooksHandler");
const { getGenre, createGenre } = require("./Handler/genreHandler");
const {
  createContact,
  updateContact,
  deleteContact,
  getContact,
  getallContact,
} = require("./Handler/ContactHandler");
const khaltiPayment = require("./Handler/KhaltiHandler");
const { getRecommendedBooks } = require("./Handler/recommendedBooksHandler");

app.use(cors({ credentials: true, origin: "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use("/uploads", express.static("uploads"));

//user
app.get("/users", authenticateToken, getUsers);
app.post("/user/add", addUser);
app.post("/user/login", loginUser);
app.post("/user/admin-login", adminLogin);
app.post("/user/google-login", googleLogin);
app.get("/get-user/:id", authenticateToken, isAdmin, getUserById);
app.post("/cart", authenticateToken, userCart);
app.post("/popularCart", authenticateToken, popularUserCart);

app.get("/getOrder", authenticateToken, isAdmin, getALLOrders);

app.get("/user-cart", authenticateToken, getUserCart);

app.delete("/delete-user-cart/:id", authenticateToken, removeProductFromCart);

app.get("/wishlist", authenticateToken, getWishlist);
app.delete("/deleteUser/:id", deleteUserById);

app.post("/create-order", authenticateToken, createOrder);

//Profile_info
app.post("/profile_info", authenticateToken, getProfile);

//changePassword
app.patch("/user/changepassword/:id", changePassword);

//blog
app.get("/blogs/:pageNumber", getBlogs);
app.get("/blog/:id", getBlogById);
app.post("/blog/add", addBlog);
app.put("/blog/edit/:id", authenticateToken, editBlog);
app.delete("/blog/delete/:id", authenticateToken, deleteBlog);

// add views
app.post("/article-add-views/:id", addViews);

// comments
app.post("/comment/add", authenticateToken, addComment);
app.get("/comment/:blogId", getComments);

//book
app.get("/books", getBooks);
app.post("/book/add", addBook);
app.get("/book/:id", getBookById);
app.put("/book/update/:id", updateBook);
app.delete("/book/delete/:id", deleteBookById);
app.put("/wishlist", authenticateToken, addToWishlist);
app.put("/rate", authenticateToken, rating);
app.post("/search", searchByQueryType);

//genre
app.get("/genre", getGenre);
app.post("/genre/add", createGenre);

//popularBooks
app.get("/popularBooks", getPopularBooks);
app.get("/popularBook/:id", getPopularBooksById);
app.put("/popularBook/wishlist", authenticateToken, addPopularBooksToWishlist);

//RecommendedBooks
app.get("/recommendedBooks", authenticateToken, getRecommendedBooks);

//contact
app.post("/contact/add", createContact);
app.put("/contact/:id", authenticateToken, isAdmin, updateContact);
app.delete("/delete/:id", authenticateToken, isAdmin, deleteContact);
app.get("/contact/:id", getContact);
app.get("/contact", getallContact);

//khalti
app.post("/khalti", khaltiPayment);

const port = 8000;
app.listen(port, function () {
  console.log("Server listening on port" + port);
});
