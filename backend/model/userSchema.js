// user schema 
const mongoose=require('mongoose')

const UserSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    dob:{
        required:true,
        type:Date
    },
    phone:{
        required:true,
        type:Number
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})
const User=mongoose.model("user",UserSchema)
module.exports=User