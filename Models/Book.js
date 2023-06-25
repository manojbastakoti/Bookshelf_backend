const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  price: {
    type: Number,
  },
  cover: {
    type: String,
  },
  description: {
    type: String,
  },
  // rating: [{ userId: mongoose.Schema.Types.ObjectId, rating: Number }],
  author: {
    type: String,
  },
  publishedDate: {
    type: Date,
  },
  // genre: [{ type: mongoose.Schema.Types.ObjectId, ref: "genre" }],
  genre:{
    type:String,
  },
  // owner: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // heldBy: {
  //   type: Schema.Types.ObjectId,
  //   ref: "User",
  // },
  // wishlistUsers: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "user",
  //   },
  // ],
},
{
  timestamps: true,
});

const BookModel = mongoose.model("book",bookSchema);

module.exports=BookModel;
