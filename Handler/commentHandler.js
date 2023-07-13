const BlogModel = require("../Models/Blog");
const CommentsModel = require("../Models/Comment");


const addComment = async (req, res) => {
    try {
        const { blog_id, comment } = req.body;

        if( !blog_id || !comment) return res.json({
            success: false,
            message: "Insufficient data!"
        });
console.log("user find",req.user)
        const user= req.user
        console.log("user",user)
        
        const created = await CommentsModel.create({
            user,
            blog:blog_id,
            comment,
        });
        console.log(created)

        return res.json({
            success: true, 
            message: "Comment added!",
            data:created,
        });

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Internal server error!"
        })
    }
}

const getComments = async (req, res) => {
    try {
        const blogId = req.params.blogId;
        // console.log(blogId);
        const blog = await BlogModel.findById(blogId);
        if(!blog) return res.json({
            success: false, 
            message: "Blog not found!"
        });
        // console.log(blog)

        
    const comments = await CommentsModel.find({
        blog: blogId,
      }).populate("user").sort({ createdAt: -1 });
      
        console.log(comments);

        return res.json({
            success: true, 
            message: `Comment list for ${blogId}`,
            comments,
        })

    } catch (error) {
        console.log(error)
        return res.json({
            success: false,
            message: "Internal server error!"
        })
    }
}

module.exports = {
    addComment,
    getComments
}