// connection to backend will come here 
// import mongoose from "mongoose";
const mongoose=require('mongoose');

mongoose.set('strictQuery',false)
const connectToDB=()=>{
    try {
        mongoose.connect("mongodb+srv://safabanu:Safabanu@10@cluster0.yrujsaw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",()=>{
            console.log("connected to database ");
        })
    } catch (error) {
        console.log("Can't connect to the database due to ",error );
    }
}
module.exports=connectToDB();