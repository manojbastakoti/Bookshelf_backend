const moment = require("moment/moment");
const BlogModel = require("../Models/Blog");
const { imageValidation, uploadImage } = require("../utils");

const getBlogs = async (req, res) => {
  try {
    const blogs = await BlogModel.find();
    // console.log(blogs);
    const finalBlogs = [];
    blogs.forEach((blog) => {
      finalBlogs.push({
        id:blog._id,
        title: blog.title,
        description: blog.description,
        author: blog.author,
        image: blog.image,
        createdAt: blog.createdAt,
      });
    });
    finalBlogs.forEach((blog) => {
      blog.createdAt = moment(blog.createdAt).fromNow();
    });
    // console.log(finalBlogs);

    res.json({
      success: true,
      data: finalBlogs,
    });
  } catch (error) {
    console.log(error);
  }
};

//Retrive Single blog
const getBlogById = async (req, res) => {
  try {
    const blog = await BlogModel.findById(req.params.id);
    // console.log(blog);
    if (!blog) {
      res.json({
        success: true,
        message: "Blog not found !",
        data: null,
      });
      return false;
    }
    res.json({
      success: true,
      message: "Blog found !",
      data: blog,
    });
  } catch (error) {
    console.log(error);
  }
};

const addBlog = async (req, res) => {
  try {
    const body = req.body;
    const imageFile = req.files.image;

    if (!imageValidation(imageFile.mimetype, res)) {
      return false;
    }

    const imageFileName = uploadImage("uploads", imageFile);

    const blog = await new BlogModel({
      title: body.title,
      description: body.description,
      author: body.author,
      image: "uploads/" + imageFileName,
    });

    await blog.save();
    res.json({
      success: true,
      message: "Your article added successfully",
      data:blog,
    });
  } catch (error) {
    console.log(error);
  }
};

const editBlog = async (req, res) => {
  try {
    
    const id = req.params.id;
    const body = req.body;
    const editBlog = await BlogModel.findByIdAndUpdate({_id:id} ,body,{new:true})
        
    
    if (req.files && req.files.image) {
        let imageFileName = null;
        const imageFile = req.files.image;
      if (!imageValidation(imageFile.mimetype, res)) {
        return false;
      }
    imageFileName = uploadImage("uploads", imageFile);
    editBlog.image = imageFileName?`uploads/${imageFileName}`:null
    }
    
      await editBlog.save();


      res.json({
        success:true,
        message:"Blog updated successfully",
        editBlog
      })


  } catch (error) {
    console.log(error);
  }
};

const deleteBlog =async(req,res)=>{
    try {
        const id=req.params.id;
      
        const deleteBlog=await BlogModel.findByIdAndRemove({_id:id});
        res.json({
            success:true,
            message:"Blog deleted successfully", 
        });
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
  getBlogs,
  getBlogById,
  addBlog,
  editBlog,
  deleteBlog,
};
