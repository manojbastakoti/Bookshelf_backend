const BlogModel =require("../Models/Blog")

const getBlogs=async(req,res)=>{
    try {
        const blogs =await BlogModel.find()
        console.log(blogs)
        res.json({
            blogs:blogs,
        });
    } catch (error) {
        console.log(object)
    }
};

const addBlog=async(req,res)=>{
    try {
        const body=req.body;
        console.log(req.files);
    
        const blog=new BlogModel({
            title:body.title,
            description:body.description,
            author:body.author,
            image:body.image,
    
        });
        res.json({
            success:true,
            message:"Your article added successfully"
        });
        
    } catch (error) {
        console.log(error);
    }
};

const editBlog=async(req,res)=>{

}

module.exports={
    getBlogs,addBlog,
}