const { createToken, verifyToken, generateRefreshToken } = require("../utils");

const uniqid = require("uniqid");

const UserModel = require("../Models/User");
const CartModel = require("../Models/Cart");
const BookModel = require("../Models/Book");
const OrderModel = require("../Models/Order");
const PopularBookModel = require("../Models/Popular_Recommendation");
const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    console.log(users);
    res.json({
      users: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const addUser = async (req, res) => {
  const body = req.body;

  const user = new UserModel({
    name: body.name,
    email: body.email,
    password: body.password,
    type: "normal",
  });

  const emailAlreadyExists = await UserModel.findOne({ email: body.email });
  if (emailAlreadyExists) {
    res.json({
      success: false,
      message: "Email already exists!",
    });
    return false;
  }

  await user.save();
  res.json({
    success: true,
    message: "User added successfully",
  });
};

const loginUser = async (req, res) => {
  const body = req.body;

  const user = await UserModel.findOne({ email: body.email });
  if (!user) {
    res.json({
      success: false,
      message: "Invalid User!",
      user,
    });
    return false;
  }

  const result = await user.comparePassword(body.password);
  if (!result) {
    res.json({
      success: false,
      message: "Email or Password is wrong!",
    });
    return false;
  }

  const refreshToken = await generateRefreshToken(user?._id);
  const updateuser = await UserModel.findByIdAndUpdate(
    user.id,
    {
      refreshToken: refreshToken,
    },
    { new: true }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000,
  });

  const token = createToken({
    data: {
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  user.token = token;
  await user.save();
  // const tokenInfo = verifyToken(token)
  // console.log(tokenInfo.data.email)
  // console.log(user)
  res.cookie("auth", token);

  res.json({
    success: true,
    message: "Login successfull",
    data: {
      token,
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const adminLogin = async (req, res) => {
  const body = req.body;

  const user = await UserModel.findOne({ email: body.email });
  if (user.role !== "admin") {
    res.json({
      success: false,
      message: "Not Authorized!",
      user,
    });
    return false;
  }

  const result = await user.comparePassword(body.password);
  if (!result) {
    res.json({
      success: false,
      message: "Email or Password is wrong!",
    });
    return false;
  }

  const refreshToken = await generateRefreshToken(user?._id);
  const updateuser = await UserModel.findByIdAndUpdate(
    user.id,
    {
      refreshToken: refreshToken,
    },
    { new: true }
  );
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    maxAge: 72 * 60 * 60 * 1000,
  });

  const token = createToken({
    data: {
      user_id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });

  user.token = token;
  await user.save();
  // const tokenInfo = verifyToken(token)
  // console.log(tokenInfo.data.email)
  // console.log(user)
  res.cookie("auth", token);

  res.json({
    success: true,
    message: "Login successfull",
    data: {
      token,
      user_id: user._id,
      name: user.name,
      email: user.email,
    },
  });
};

const googleLogin = async (req, res) => {
  try {
    const body = req.body;
    let user = await UserModel.findOne({ email: body.email });

    if (user && user.type === "normal") {
      return res.json({
        success: false,
        message: "User already registered from that email !",
      });
    }

    if (!user) {
      user = new UserModel({
        name: body.name,
        email: body.email,
        password: body.googleId,
        type: "google",
      });
    }

    const token = createToken({
      data: {
        user_id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
    user.token = token;
    await user.save();

    res.cookie("auth", token);
    res.json({
      success: true,
      message: "Login successful !",
      data: {
        token,
        user_id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const changePassword = async (req, res) => {
  try {
    const id = req.params.id;
    const body = req.body;
    const user = await UserModel.findOne({ _id: id });

    const change = await user.comparePassword(body.old_password);
    if (!change) {
      res.json({
        success: false,
        message: "Old password is wrong!",
      });
      return false;
    }

    user.password = body.new_password;
    await user.save();

    res.json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

const getProfile = async (req, res) => {
  try {
    // const id = req.user._id
    // const profileInfo=await UserModel.findById(id).select("-password")
    const token = req.body.token;
    // console.log(token)
    if (!token)
      return res.json({
        success: false,
        message: "No User Found!",
      });
    const tokenInfo = await verifyToken(token);
    // console.log(tokenInfo);
    return res.json({
      success: true,
      data: tokenInfo.data,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const userInfo = await UserModel.findById(id).select("-password");
    res.json({
      userInfo,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const deleteUser = await UserModel.findByIdAndRemove(id);
    res.json({
      success: true,
      message: "User Deleted Successfully",
      deleteUser,
    });
  } catch (error) {
    console.log(error);
  }
};

const getWishlist = async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await UserModel.findById(_id)
      .populate("wishList")
      .populate("PopularwishList");
    console.log(findUser);
    const wishlist = findUser.wishList.map((item) => item.toObject());
    const Popularwishlist = findUser.PopularwishList.map((item) =>
      item.toObject()
    );

    res.json({ wishlist, Popularwishlist });
  } catch (error) {
    console.log(error);
  }
};

const userCart = async (req, res) => {
  const { bookId, quantity, price } = req.body;
  const { _id } = req.user;
  try {
    let newCart = await new CartModel({
      userId: _id,
      bookId,
      price,
      quantity,
    }).save();
    res.json({
      success: true,
      message: "Book is added to the Cart",
      newCart,
    });
  } catch (error) {
    console.log(error);
  }
};

//popularBooks into cart
const popularUserCart = async (req, res) => {
  const { popularBookId, quantity, price } = req.body;
  const { _id } = req.user;
  try {
    let newCart1 = await new CartModel({
      userId: _id,
      popularBookId,
      price,
      quantity,
    }).save();
    res.json({
      success: true,
      message: "PopularBook is added to the Cart",
      newCart1,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserCart = async (req, res) => {
  const { _id } = req.user;
  try {
    const cart = await CartModel.find({ userId: _id })
      .populate("popularBookId")
      .populate("bookId");
    if (!cart) {
      res.json({
        success: false,
        message: "Your Cart is Empty!",
      });
      return false;
    }
    // const cartList = cart.popularBookId.map((item) => item.toObject());
    // const popularCartList = cart.bookId.map((item) => item.toObject());
    res.json(cart);
  } catch (error) {
    console.log(error);
  }
};

const removeProductFromCart = async (req, res) => {
  const { _id } = req.user;
  const id = req.params.id;
  console.log(id);
  // console.log(cartItemId)
  try {
    if (!id) {
      res.json({
        success: false,
        message: "Invalid Cart Item Id",
      });
      return false;
    }
    const deleteproductfromcart = await CartModel.findOneAndRemove({
      userId: _id,
      _id: id,
    });
    console.log(deleteproductfromcart);
    res.json(deleteproductfromcart);
  } catch (error) {
    console.log(error);
  }
};
const createOrder = async (req, res) => {
  const { _id } = req.user;
  const { shippingInfo, orderItems, totalPrice } = req.body;
  try {
    // Check book availability and update quantity
    const updatePromises = orderItems.map(async (item) => {
      console.log(item);
      const book = await BookModel.findById(item.book);
      const PopularBook = await PopularBookModel.findById(item.book);

      if (
        (!book || book.quantity < item.quantity) &&
        (!PopularBook || PopularBook.quantity < item.quantity)
      ) {
        res.json({
          message: "Insufficient stock for book",
        });
        return;
      }

      if (PopularBook) {
        // Handle popular book inventory management here
        // For example, decrement popular book quantity or update popularity counter
        // You can also use a separate handler function to manage popular books' inventory
        // For this example, let's decrement popular book quantity by item.quantity
        PopularBook.quantity -= item.quantity;
        await PopularBook.save();
      } else if (book) {
        // Regular book inventory management
        book.quantity -= item.quantity;
        await book.save();
      }
    });

    await Promise.all(updatePromises);

    const order = await OrderModel.create({
      shippingInfo,
      orderItems,
      totalPrice,
      user: _id,
    });
    res.json({
      success: true,
      message: "Order Received",
    });
  } catch (error) {
    console.log(error);
  }
};

const getALLOrders = async (req, res) => {
  try {
    const order = await OrderModel.find();
    res.json({
      order: order,
    });
  } catch (error) {
    console.log(error);
  }
};

// const emptyCart = async (req, res) => {
//   const { _id } = req.user;

//   try {
//     const user = await UserModel.findOne({ _id });
//     const cart = await CartModel.findOneAndRemove({ userId:_id, });
//     res.json(cart);
//   } catch (error) {
//     console.log(error)
//   }
// };

// const createOrder = async (req, res) => {
//   const { wallet } = req.body;
//   const { _id } = req.user;

//   try {
//     if (!wallet)res.json("Create wallet order failed");
//     const user = await UserModel.findById(_id);
//     let userCart = await CartModel.findOne({ orderby: user._id });
//     let finalAmount = 0;
//       finalAmount = userCart.cartTotal;

//     let newOrder = await new OrderModel({
//       books: userCart.books,
//       paymentIntent: {
//         id: uniqid(),
//         method: "wallet",
//         amount: finalAmount,
//         status:"Payment with Wallet",
//         created: Date.now(),
//         currency: "Rupees",
//       },
//       orderby: user._id,
//       orderStatus: "Payment with Wallet",
//     }).save();
//     let update = userCart.books.map((item) => {
//       return {
//         updateOne: {
//           filter: { _id: item.book._id },
//           update: { $inc: { quantity: -item.count, sold: +item.count } },
//         },
//       };
//     });
//     const updated = await BookModel.bulkWrite(update, {});
//     res.json({ message: "success" });
//   } catch (error) {
//     console.log(error)
//   }
// };

// const getOrders =async (req, res) => {
//   const { _id } = req.user;
//   try {
//     const userorders = await OrderModel.findOne({ orderby: _id })
//       .populate("books.book")
//       .populate("orderby")
//       .exec();
//     res.json(userorders);
//   } catch (error) {
//     console.log(error)
//   }
// };

module.exports = {
  getUsers,
  addUser,
  googleLogin,
  loginUser,
  changePassword,
  getProfile,
  getUserById,
  deleteUserById,
  adminLogin,
  getWishlist,
  userCart,
  popularUserCart,
  getUserCart,
  removeProductFromCart,
  createOrder,
  getALLOrders,
};
