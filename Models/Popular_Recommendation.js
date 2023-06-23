const mongoose = require("mongoose");

const popularRecommendationSchema = new mongoose.Schema({
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
  ratings:{ type: Number },
  avgrating:{type:Number},
  Author: {
    type: String,
    required: true,
  },
  year: {
    type: Date,
  },
  ISBN:{
    type:String,
    required:true,
  }
 
},{ collection: 'PopularBooks' })

const PopularBookModel = mongoose.model("PopularBook",popularRecommendationSchema);

module.exports=PopularBookModel;
