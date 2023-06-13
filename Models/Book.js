const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cover: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  rating:{ type: Number },
  author: {
    type: String,
    required: true,
  },
  publishedDate: {
    type: Date,
  },
  genre:{ type:String},

  wishlistUsers: [
    {
      type:String,
      ref: "User",
    },
  ],
});

const BookModel = mongoose.model("book",bookSchema);

module.exports=BookModel;
