const {createToken, verifyToken}=require("../utils")

const UserModel = require("../Models/User")
const getUsers =async(req,res)=>{
    try {
        const users= await UserModel.find()
        console.log(users);
        res.json({
            users:users,
        });
        
    } catch (error) {
        console.log(error)
    }


};

const addUser= async(req,res)=>{
    const body=req.body;

    const user=new UserModel({
        name:body.name,
        email:body.email,
        password:body.password,
        type: "normal",

    });

    const emailAlreadyExists=await UserModel.findOne({email:body.email});
    if(emailAlreadyExists){
        res.json({
            success:false,
            message:"Email already exists!"
        });
        return false;
    };
    
    await user.save();
    res.json({
        success:true,
        message:"User added successfully",
    });
};

const loginUser=async(req,res)=>{
    const body= req.body;

    const user=await UserModel.findOne({email:body.email})
    if(!user){
        res.json({
            success:false,
            message:"Invalid User!",
            user
        });
        return false;
    }

    const result= await user.comparePassword(body.password)
    if(!result){
        res.json({
            success:false,
            message:"Email or Password is wrong!",
        });
        return false;
    }

    const token =createToken({
        data:{
            user_id: user._id,
            name:user.name,
            email:user.email,
        },
    })
    
    
    user.token=token;
    await user.save();
    // const tokenInfo = verifyToken(token)
    // console.log(tokenInfo.data.email)
    // console.log(user)
    res.cookie("auth",token)

    res.json({
        success:true,
        message:"Login successfull",
        data:{
            token,
            user_id:user._id,
            name:user.name,
            email:user.email,

        },
    })
}
const googleLogin = async (req, res) => {
    try {
      const body = req.body;
      let user = await UserModel.findOne({ email: body.email });
  
      if (user && user.type === "normal") {
        return res.json({
          success: false,
          message: "User already registered from that email !",
        });
      }
  
      if (!user) {
        user = new UserModel({
          name: body.name,
          email: body.email,
          password: body.googleId,
          type: "google",
        });
      }
  
      const token = createToken({
        data: {
          user_id: user._id,
          name: user.name,
          email: user.email,
        },
      });
      user.token = token;
      await user.save();
  
      res.cookie("auth", token);
      res.json({
        success: true,
        message: "Login successful !",
        data: {
          token,
          user_id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

const changePassword = async(req,res)=>{
    try {
        const id= req.params.id;
        const body=req.body;
        const user=await UserModel.findOne({_id:id})

        const change= await user.comparePassword(body.old_password);
        if(!change){
            res.json({
                success:false,
                message:"Old password is wrong!",
            });
            return false;
        }
        
        user.password=body.new_password;
        await user.save();

        res.json({
            success:true,
            message:"Password changed successfully",
        });

    } catch (error) {
        console.log(error)
    }

};

const getProfile=async(req,res)=>{
    try {
    // const id = req.user._id
    // const profileInfo=await UserModel.findById(id).select("-password")
    const token =req.body.token;
    // console.log(token)
    if(!token) return res.json({
        success:false,
        message:"No User Found!",
    })
    const tokenInfo = await verifyToken(token)
    // console.log(tokenInfo);
    return res.json({
        success:true,
        data:tokenInfo.data,
    })
    } catch (error) {
        console.log(error)
    }
};

module.exports={
    getUsers,addUser,googleLogin,loginUser,changePassword,getProfile,
}