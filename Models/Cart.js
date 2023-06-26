const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
        },
        count: Number,
        genre: String,
        price: Number,
      },
    ],
    cartTotal: Number,
    // totalAfterDiscount: Number,
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("cart",cartSchema);
module.exports = CartModel