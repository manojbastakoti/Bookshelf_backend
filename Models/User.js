const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,

    },
    token:{
        type:String,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    type: {
        type: String,
        
      },
    password:{
        type:String,
        required:true,
    },
});

userSchema.pre("save" ,async function(next){
    if(this.isModified("password")){
        const hash=await bcrypt.hash(this.password,12)
        this.password=hash;
    }
    next();
})

userSchema.methods.comparePassword=async function(password){
    const result = await bcrypt.compare(password,this.password)
    return result;
}

const UserModel = mongoose.model("user",userSchema);

module.exports=UserModel;