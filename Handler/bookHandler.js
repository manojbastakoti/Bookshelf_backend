const BookModel = require("../Models/Book");
const { imageValidation, uploadImage } = require("../utils");

const getBooks = async(req,res)=>{
    try {
        res.send("Hello");
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
        title: body.title,
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
module.exports={
    getBooks,addBook
}

