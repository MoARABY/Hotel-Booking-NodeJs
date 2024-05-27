const userModel = require('../models/userModel');
const bcrypt=require('bcrypt');

const showUser = async (req, res) => {
    try {
        const user=await userModel.findById(req.params.id);
        const {password,...others}=user._doc;
        !user?res.status(400).json({message:'User not found'}):res.status(200).json({...others})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const showUsers=async(req,res)=>{
    try {
        const users =await userModel.find();
        users?res.status(200).json(users) : res.status(200).json("no ysers founded")
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const updateUser = async (req, res) => {
    try {
        if(req.body.password){
            const salt=await bcrypt.genSalt(10);
            req.body.password=await bcrypt.hash(req.body.password,salt);
        }
        const newUser=await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        const {password,...others}=newUser._doc;
        !newUser?res.status(400).json({message:'User not found'}):res.status(200).json({...others})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}
const deleteUser = async (req, res) => {
    try {
        const user=await userModel.findByIdAndDelete(req.params.id);
        !user?res.status(400).json({message:'User not found'}):res.status(200).json({message:'User deleted successfully'})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}



module.exports = {showUser,showUsers,updateUser,deleteUser};