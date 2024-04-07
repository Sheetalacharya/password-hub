const express=require("express")
const cors=require("cors")
const app=express()
require("./database/connection")
const port=3001

app.use(cors())
app.use(express.json())

app.use("/auth/api",require("./routes/userRoute"))
app.use("/manage",require("./routes/passwordRoute"))

app.listen(port,()=>{
    console.log(`connected to http://localhost:${port}`);
})

