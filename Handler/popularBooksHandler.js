const PopularBookModel = require("../Models/Popular_Recommendation");

const getPopularBooks =async(req,res)=>{
    try {
        
        // const id = req.params.id;
        const popularBooks= await PopularBookModel.find()
        console.log(popularBooks);
        res.json({
            popularBooks,
        });
        
    } catch (error) {
        console.log(error)
    }


};
const getPopularBooksById = async (req, res) => {
    try {
      const book = await PopularBookModel.findById(req.params.id);
      // console.log(blog);
      if (!book) {
        res.json({
          success: true,
          message: "Book not found !",
          data: null,
        });
        return false;
      }
      res.json({
        success: true,
        message: "Book found !",
        data: book,
      });
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports={
   getPopularBooks,getPopularBooksById
}