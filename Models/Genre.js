const mongoose = require("mongoose");

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 100,
    },
    slug: {
      type: String,
      maxLength: 100,
    },
    books: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "book",
      },
    ],
  },
  {
    timestamps: true,
  }
);

genreSchema.pre("save", function (next) {
  this.slug = this.name.split(" ").join("-");
  next();
});

const GenreModel = mongoose.model("genre",genreSchema);
module.exports = GenreModel