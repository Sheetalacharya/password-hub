const mongoose=require('mongoose');
"7BMWIv7VJ5tB5zNQ"

mongoose.set('strictQuery',false)
const connectToDB=()=>{
    try {
        mongoose.connect("mongodb+srv://manishkulalweb:7BMWIv7VJ5tB5zNQ@cluster0.fkwg8bm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
        console.log("connected to database");
    } catch (error) {
        console.log("Can't connect to the database due to ",error );
    }
}
module.exports=connectToDB();