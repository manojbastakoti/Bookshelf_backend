const BookModel = require("../Models/Book");
const { imageValidation, uploadImage } = require("../utils");

const getBooks = async(req,res)=>{
    try {
        const books = await BookModel.find()
        console.log(books)
        if(!books){
          res.json({
            success:false,
            message:"No books found!"
          });
          return false;
        }
        res.json({
          success:true,
          message:"Books Found",
          books
        })
    } catch (error) {
        console.log(error);
    }
};

const addBook = async (req, res) => {
    try {
      const body = req.body;
      const imageFile = req.files.cover;
      console.log(imageFile);
  
      if (!imageValidation(imageFile.mimetype, res)) {
        return false;
      }
  
      const imageFileName = uploadImage("uploads", imageFile);
  
      const book = await new BookModel({
        title:body.title,
        price:body.price,
        cover:"uploads/"+imageFileName,
        description: body.description,
        author: body.author,
        publishedDate:body.date,
        genre:body.genre,
      });
  
      await book.save();
      res.json({
        success: true,
        message: "Your book added successfully",
        book,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getBookById= async (req,res)=>{
 try {
  const id= req.params.id
  // console.log(id)
  const book = await BookModel.findById(id)
  if(!book){
    res.json({
      success:false,
      message:"No books found!"
    });
    return false;
  }
  res.json({
    success:true,
    message:"Books Found",
    book,
  });
} catch (error) {
 console.log(error)
}

  };

  const updateBook = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
      // if (req.body.title) {
      //   req.body.slug = slugify(req.body.title);
      // }
      const updateBook = await BookModel.findByIdAndUpdate({ _id: id },body, {
        new: true,
      });
      if(!updateBook){
        res.json({
          success:false,
          message:"No books found!"
        });
        return false;
      }
      res.json({
        success:true,
        message:"Book Updated Successfully",
        updateBook,
      });
    } catch (error) {
      console.log(error)
    }
  };
  const deleteBookById = async(req,res)=>{
    try {
        const id= req.params.id
        // console.log(id)
        const deleteBook = await BookModel.findByIdAndRemove(id);
        res.json({
            success:true,
            message:"Book Deleted Successfully",
            deleteBook
        })
        
    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getBooks,addBook,getBookById,updateBook,deleteBookById
}

