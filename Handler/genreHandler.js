const Genre = require("../Models/Genre");

const createGenre =async(req,res)=>{
    try {
        const { name } = req.body;
        const slug = name.split(" ").join("-");
        const alreadyExists = await Genre.exists({
          slug,
        });
    
        if (alreadyExists) {
          res.json({
            success: false,
            message: `Genre with name ${name} already exists.`,
            data: null,
          });
        }
    
        const genre = await Genre.create({ name });
        res.json({
          success: true,
          message: "Genre created successfully",
          data: genre,
        });
      } catch (error) {
        errorHandler({ error, res });
      }
    
};

model.exports={createGenre}