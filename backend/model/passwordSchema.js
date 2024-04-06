// password schema 
const mongoose=require('mongoose')

const PasswordSchema=new mongoose.Schema({
    userId:{
        required:true,
        type:number
    },
    title:{
        required:true,
        type:String
    },
    generatedPass:{
        required:true,
        type:String
    },
    date:{
        required:true,
        type:Date,
        default:Date.now
    }
})
const Password=mongoose.model("password",PasswordSchema)
module.exports=Password