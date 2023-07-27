const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "book",
    },
    popularBookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PopularBook",
    },
    quantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("cart", cartSchema);
module.exports = CartModel;
