const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    name: {
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps: true});

const Usermodel=mongoose.model("users",UserSchema);
module.exports=Usermodel