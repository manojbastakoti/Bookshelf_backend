const BookModel = require("../Models/Book");
const UserModel = require("../Models/User");
const { imageValidation, uploadImage } = require("../utils");

const getBooks = async (req, res) => {
  try {
    const keyword= req.query.keyword?{
      title:{
        $regex: req.query.keyword,
        $options:"i",
      },
    }
    :{}

    const books = await BookModel.find({...keyword});
    console.log(books);
    if (!books) {
      res.json({
        success: false,
        message: "No books found!",
      });
      return false;
    }
    res.json({
      success: true,
      message: "Books Found",
      books,
    });
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
      price: body.price,
      cover: "uploads/" + imageFileName,
      description: body.description,
      author: body.author,
      publishedDate: body.publishedDate,
      genre: body.genre,
      ISBN:body.ISBN,
      quantity:body.quantity,
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

const getBookById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const book = await BookModel.findById(id);
    if (!book) {
      res.json({
        success: false,
        message: "No books found!",
      });
      return false;
    }
    res.json({
      success: true,
      message: "Books Found",
      book,
    });
  } catch (error) {
    console.log(error);
  }
};

const updateBook = async (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    // if (req.body.title) {
    //   req.body.slug = slugify(req.body.title);
    // }
    const updateBook = await BookModel.findByIdAndUpdate({ _id: id }, body, {
      new: true,
    });
    if (!updateBook) {
      res.json({
        success: false,
        message: "No books found!",
      });
      return false;
    }
    res.json({
      success: true,
      message: "Book Updated Successfully",
      updateBook,
    });
  } catch (error) {
    console.log(error);
  }
};
const deleteBookById = async (req, res) => {
  try {
    const id = req.params.id;
    // console.log(id)
    const deleteBook = await BookModel.findByIdAndRemove(id);
    res.json({
      success: true,
      message: "Book Deleted Successfully",
      deleteBook,
    });
  } catch (error) {
    console.log(error);
  }
};

const addToWishlist = async (req, res) => {
  const { _id } = req.user;
  const { bookId } = req.body;
  try {
    const user = await UserModel.findById(_id);
    console.log(user);
    const alreadyadded = user.wishList.find((id) => id.toString() === bookId);
    if (alreadyadded) {
      let user = await UserModel.findByIdAndUpdate(
        _id,
        {
          $pull: { wishList: bookId },
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
          $push: { wishList: bookId },
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

const rating = async (req, res) => {
  const { _id } = req.user;
  const { star, bookId } = req.body;
  try {
    const book = await BookModel.findById(bookId);
    let alreadyRated = book.ratings.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await BookModel.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star },
        },
        {
          new: true,
        }
        );
        // res.json({
        //   success: true,
        //   message: "You have updated the rating for this book",
        //   updateRating,
        // });
    } else {
      const rateBook = await BookModel.findByIdAndUpdate(
        bookId,
        {
          $push: {
            ratings: {
              star: star,
              // comment: comment,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
      // res.json({
      //   success:true,
      //   message:"You have rated this book",
      //   rateBook
      // });
    }
    const getallratings = await BookModel.findById(bookId);
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalBook = await BookModel.findByIdAndUpdate(
      bookId,
      {
        totalrating: actualRating,
      },
      { new: true }
    );
    res.json(finalBook);
  } catch (error) {
    console.log(error);
  }
};

const searchByQueryType = async (req, res) => {
	const { type, query } = req.body;

	try {
		let books;

		switch (type) {
			case 'text':
				books = await BookModel.find({ $text: { $search: query } });
				break;
			// case 'category':
			// 	products = await Product.find({ productCategory: query });
			// 	break;
		}

		if (!books.length > 0) {
			books = await BookModel.find({});
		}

		res.json({ books });
	} catch (error) {
		console.log(error)
		
	}
};

module.exports = {
  getBooks,
  addBook,
  getBookById,
  updateBook,
  deleteBookById,
  addToWishlist,
  rating,
  searchByQueryType
};
