const userModel=require('../models/userModel');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const asyncHandler=require('express-async-handler');




const userRegister=asyncHandler(async (req,res)=>{
    try {
        // const password=req.body.password;
        const email=req.body.email;
        const username=req.body.username;
        if(!username || !email || !req.body.password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(req.body.password.length<6){
            return res.status(400).json({message:"Password must be atleast 6 characters"});
        }
        if(email.indexOf('@')===-1){
            return res.status(400).json({message:"Invalid email"});
        }
        const userExists=await userModel.findOne({email})
        if(userExists){
            return res.status(400).json({message:"User already exists",user:userExists});
        }
        const salt=await bcrypt.genSalt(10);
        const hashPassword=await bcrypt.hash(req.body.password,salt);
        const user=await userModel.create({
            ...req.body,
            password:hashPassword
        });
        const {password,...others}=user._doc;
        user?res.status(201).json({message:"User created successfully",user:others}):res.status(400).json({message:"User not created"});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})

const userLogin=asyncHandler(async (req,res)=>{
    try {
        const email=req.body.email;
        if(!email || !req.body.password){
            return res.status(400).json({message:"All fields are required"});
        }
        if(email.indexOf('@')===-1){
            return res.status(400).json({message:"Invalid email"});
        }
        const findUser=await userModel.findOne({email})
        if(!findUser){
            return res.status(400).json({message:"User not found"});
        }
        const validPassword=await bcrypt.compare(req.body.password,findUser.password);
        if(!validPassword){
            return res.status(400).json({message:"Invalid password"});
        } else {
            const accessToken=jwt.sign({id:findUser._id,isAdmin:findUser.isAdmin},process.env.SECRET_KEY,{expiresIn:"1d"});
            // بعد كدا بنحطها في الكوكيز بدل ما نجيبها كل مره في الهيدر
            const{password,isAdmin,...others}=findUser._doc;
            return res.cookie("Token",accessToken,{
                httpOnly:true,
            }).status(200).json({message:"Login successful",others,accessToken});
        }
    } catch (error) {
        res.status(500).json({message:error.message});
    }
})


module.exports={userRegister,userLogin}