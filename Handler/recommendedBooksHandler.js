const RecommendedModel = require("../Models/Recommended");
const getRecommendedBooks = async (req, res) => {
  try {
    const recommendedBooks = await RecommendedModel.find({
      TouserID: req.user._id,
    });
    res.json({
      recommendedBooks,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getRecommendedBooks };
