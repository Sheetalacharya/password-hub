const mongoose=require('mongoose')

const PasswordSchema=new mongoose.Schema({
    userId:{
        required:true,
        type:String
    },
    title:{ 
        required:true,
        type:String
    },
    password:{
        required:true,
        type:String
    },
    username:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date,
        default:Date.now
    }
})
const password=mongoose.model("password",PasswordSchema)
module.exports=password