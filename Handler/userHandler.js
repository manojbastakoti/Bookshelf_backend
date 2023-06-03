const {createToken}=require("../utils")

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

    const token =createToken({data:result});
    user.token=token;
    await user.save();
    // console.log(user)
    res.cookie("auth",token)

    res.json({
        success:true,
        message:"Login successfull",
        data:{
            token
        },
    })
}

module.exports={
    getUsers,addUser,loginUser
}