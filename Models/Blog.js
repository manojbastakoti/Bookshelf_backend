const mongoose =require("mongoose");

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    introduction:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    author_id: {
        type: String,
        required: true,
      },
    author:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    views: {
        type: Number,
        default: 0,
      },
      viewed: {
        type: [String],
        default: [],
      },
    
},
{timestamps:true}
)

const BlogModel = mongoose.model("blog",blogSchema)

module.exports=BlogModel;