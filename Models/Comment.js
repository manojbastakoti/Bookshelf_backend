const mongoose = require("mongoose");

const commentsSchema = new mongoose.Schema(
  {
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    blog: [{ type: mongoose.Schema.Types.ObjectId, ref: 'blog' }],
    comment: {
        type: String,
        required: true,
    },
  },
  { timestamps: true }
);

const CommentsModel = mongoose.model("comment", commentsSchema);

module.exports = CommentsModel;