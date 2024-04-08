const mongoose=require('mongoose');
const dotenv=require("dotenv")
dotenv.config()

mongoose.set('strictQuery',false)
const connectToDB=()=>{
    try {
        mongoose.connect(process.env.MONGODB_CONNECTION_STRING)
        console.log("connected to database");
    } catch (error) {
        console.log("Can't connect to the database due to ",error );
    }
}
module.exports=connectToDB();