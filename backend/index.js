const express=require("express")
const cors=require("cors")
const dotenv=require("dotenv")

require("./database/connection")

const app=express()
dotenv.config()
const port=process.env.PORT


app.use(cors())
app.use(express.json())

app.use("/auth/api",require("./routes/userRoute"))
app.use("/manage",require("./routes/passwordRoute"))

app.listen(port,()=>{
    console.log(`connected to http://localhost:${port}`);
})

