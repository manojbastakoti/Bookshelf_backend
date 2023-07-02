const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var cartSchema = new mongoose.Schema(
  {
    userId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"user",
    },
    bookId:{
      type:mongoose.Schema.Types.ObjectId,
      ref:"book",
    },
    quantity:{
      type:Number,
      required:true
    },
    price:{
      type:Number,
      required:true
    },
  },
  {
    timestamps: true,
  }
);

const CartModel = mongoose.model("cart",cartSchema);
module.exports = CartModel