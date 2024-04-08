const jwt=require('jsonwebtoken')


const secretKey = process.env.SECRETKEY

const LoginStatus =(req,res,next)=>{
    const token=req.header("authToken")
    if(!token){
        return res
        .status(500)
        .json({ message: "error", error: "Sorry invalid user authenticate first" });
    }
    try {   
        const data=jwt.verify(token,secretKey)
        req.user=data.id
        next()
    } catch (error) {
        return res.status(500).json({ message: "error", error: "Sorry invalid user authenticate first" });
    }
}

module.exports=LoginStatus