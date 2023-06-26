const mongoose = require("mongoose"); 

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema(
  {
    books: [
      {
        book: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "book",
        },
        count: Number,
        genre: String,
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: String,
      default: "Not Processed",
      enum: [
        "Not Processed",
        "Payment with Wallet",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Delivered",
      ],
    },
    orderby: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

const OrderModel = mongoose.model("order",orderSchema);
module.exports = OrderModel