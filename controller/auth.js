const user = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const registerUser=async (req,res)=>{
    try {
        const {name,email,password}= req.body
        if(!name || !email || !password){
            return res.status(400).json({errorMeassage:"Bad reqeust"})
        }
        const present=await user.findOne({email:email})
        if(present){
            return res.status(409).json({errorMeassage:"User already exist"})
        }
        const newPassword=await bcrypt.hash(password,10)
        const data= new user({
            name,
            email,
            password:newPassword
        })
        await data.save()
        res.json({message:"user register successfull"})
    } catch (error) {
        console.log(error)
    }
}
const loginUser = async (req,res)=>{
    try {
        
        const {email,password}= req.body
        if(!email || !password){
            return res.status(400).json({errorMeassage:"Bad reqeust"})
        }
        const present=await user.findOne({email:email})
        if(!present){
            
            return res.json({errorMeassage:"user does not exist"})
            
        }
        const newPassword= await bcrypt.compare(password,present.password)
        
        if(!newPassword){
        
            return res.json({errorMeassage:"incorrect password"})
        }
        const token =jwt.sign({user_id:present._id},process.env.SECERT_KEY)
        res.json({token:token})
    } catch (error) {
        console.log(error)
    }
}

module.exports={registerUser,loginUser}