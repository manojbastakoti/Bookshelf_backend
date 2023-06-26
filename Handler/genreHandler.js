const GenreModel = require("../Models/Genre");


const createGenre =async(req,res)=>{
    try {
        const { name } = req.body;
        const slug = name.split(" ").join("-");
        const alreadyExists = await GenreModel.exists({
          slug,
        });
    
        if (alreadyExists) {
          res.json({
            success: false,
            message: `Genre with name ${name} already exists.`,
            data: null,
          });
        }
    
        const genre = await GenreModel.create({ name });
        res.json({
          success: true,
          message: "Genre created successfully",
          data: genre,
        });
      } catch (error) {
        console.log(error);
      }
    
};

const getGenre= async(req,res)=>{
  try {
    const genres = await GenreModel.find()
    if(!genres){
      res.json({
        success:false,
        message:"No genre found!"
      });
      return false;
    }
    res.json({
      success:true,
      message:"Genre found",
      genres
    })


  } catch (error) {
    console.log(error)
  }
}

module.exports={createGenre,getGenre}