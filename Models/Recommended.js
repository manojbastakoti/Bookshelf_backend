const mongoose = require("mongoose");

const RecommendedSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },

    Image: {
      type: String,
      required: true,
    },
    //   description: {
    //     type: String,
    //     required: true,
    //   },
    ratings: { type: Number },
    //   avgrating:{type:Number},
    Author: {
      type: String,
      required: true,
    },
    PublishedYear: {
      type: Date,
    },
    ISBN: {
      type: String,
      required: true,
    },
    TouserID: {
      type: String,
    },
    BookID: {
      type: String,
    },
  },
  { collection: "Recommendbooks" }
);

const RecommendedModel = mongoose.model("Recommendbook", RecommendedSchema);

module.exports = RecommendedModel;
