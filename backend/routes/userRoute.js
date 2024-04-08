const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')

const User = require('../model/userSchema')
const LoginStatus = require("../middleware/LoginStatus")

const router = express.Router()
const secretkey = process.env.SECRETKEY


router.post("/createuser", async (req, res) => {
    const { name, phone, email, password,dob } = req.body
    try {
        let user =await User.findOne({ email })
        if (user) return res.status(409).json({ status: "error", message: "User with this email address already found" })
        
        const hashPass = await bcrypt.hash(password, await bcrypt.genSalt(10))

        user =await User.create({
            name,
            phone,
            dob,
            email,
            password: hashPass,
        })

        const token = jwt.sign({ id: user._id }, secretkey) 
        return res.status(201).json({ status: "success", message: token})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.post("/signin", async (req, res) => {
    const { email, password } = req.body
    try {
        let user =await User.findOne({ email })
        if (!user) return res.status(400).json({ status: "error", message: "Invalid Credential" })
        if (!await bcrypt.compare(password,user.password)) return res.status(401).json({ status: "error", message: "Invalid Credential" })
        const token = jwt.sign({ id: user._id }, secretkey)
        return res.status(200).json({ status: "success", message: token })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.get("/fetchuser", LoginStatus,async (req, res) => {
    let id=req.user
    try {
        let user =await User.findById(id).select("-password")
        if (!user) return res.status(400).json({ status: "error", message: "Invalid Credential" })
        return res.status(200).json({ status: "success", message: user })
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.post('/updateuser',LoginStatus,async(req,res)=>{
    let id=req.user
    const { name, phone, password,dob } = req.body
    try {
        let user=await User.findByIdAndUpdate(id,{name, phone, password,dob})
        if(!user) return res.status(400).json({ status: "error", message:"User not found"})
        return res.status(200).json({ status: "success", message:"updated successfully"})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})
router.delete('/deleteuser',LoginStatus,async(req,res)=>{
    let id=req.user
    try {
        let user=await User.findByIdAndDelete(id)
        if(!user) return res.status(400).json({ status: "error", message:"User not found"})
        return res.status(200).json({ status: "success", message:"deleted successfully"})
    } catch (error) {
        return res.status(500).json({ status: "error", message: "Internal server error" })
    }
})





module.exports = router