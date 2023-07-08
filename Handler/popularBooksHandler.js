const PopularBookModel = require("../Models/Popular_Recommendation");
const UserModel = require("../Models/User");

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

  const addPopularBooksToWishlist = async (req, res) => {
    const { _id } = req.user;
    const { bookId } = req.body;
    try {
      const user = await UserModel.findById(_id);
      console.log(user);
      const alreadyadded = user.PopularwishList.find((id) => id.toString() === bookId);
      if (alreadyadded) {
        let user = await UserModel.findByIdAndUpdate(
          _id,
          {
            $pull: { PopularwishList: bookId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      } else {
        let user = await UserModel.findByIdAndUpdate(
          _id,
          {
            $push: { PopularwishList: bookId },
          },
          {
            new: true,
          }
        );
        res.json(user);
      }
    } catch (error) {
      console.log(error);
    }
  };
  

module.exports={
   getPopularBooks,getPopularBooksById,addPopularBooksToWishlist
}