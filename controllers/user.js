const mongoose = require('mongoose')
const jwt=  require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User=  require('../models/user.js')
const user = require('../models/user.js')

module.exports.signUp = async(req,res)=>{
    const {name,email,password,rollno,phone,batch,department} = req.body
    try {
        const existinguser=await User.findOne({email}).populate('enrolled')
        if(existinguser){
            return res.status(400).json({message:'User already found..'})
        }
        const hashPassword = await bcrypt.hash(password,12);
        const newUser=new User({name,email,rollno,phone,department,batch,password:hashPassword})
        newUser.image=req.file.path.substring(6)
        await newUser.save();
        const token = jwt.sign({email:newUser.email,id:newUser._id},'token',{expiresIn:'1h'})
        res.status(200).json({result:newUser,token})
    } catch (err) {
        res.status(500).json('Something went worng...')
    }
}

module.exports.login = async(req,res) =>{
    const {email,password} = req.body;
    try{
        const existinguser = await User.findOne({email})
        if(!existinguser){
            return res.status(404).json({message:"User not found..."})
        }
        const isPasswordCrt = await bcrypt.compare(password,existinguser.password)
        if(!isPasswordCrt){
            return res.status(400).json({message:"Invalid credentials"})
        }
        const token = jwt.sign({email:existinguser.email,id:existinguser._id},'token',{expiresIn:'48h'})
        res.status(200).json({result:existinguser,token})
    }catch(err){
        res.status(500).json(err.message)
    }
}

module.exports.updatePhoto = async(req,res)=>{
    const {id}=req.body
    try {
        const user = await User.findById(id)
        user.image=req.file.path.substring(6)
        await user.save()
        res.status(200).json('success')

    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.updatePassword=async(req,res)=>{
    const {id,password}=req.body
    try {
        const user=await User.findById(id)
        const hashPassword = await bcrypt.hash(password,12);
        user.password=hashPassword;
        await user.save()
        res.status(200).json("success")

    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports.updateDetails = async(req,res)=>{
    const {phone,id}=req.body
    try {
        const user=await User.findById(id)
        user.phone=phone;
        await user.save()
        res.status(200).json("success");
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.myDetails = async(req,res)=>{
    const {id}=req.params
    try {
        const user=await User.findById(id).populate('posts').populate({path:'posts',populate:{path:'comment',populate:{
            path:'commentedBy'
        }}});
        res.status(200).json(user)
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports.getAllUsers = async(req,res)=>{

    try {
        const users = await User.find({}).populate('posts').populate({path:'posts',populate:{path:'comment',populate:{
            path:'commentedBy'
        }}});
        console.log(users)
        res.status(200).json(users)
    } catch (err) {
        console.log(err.message)
        res.status(500).json(err.message)
    }
}

module.exports.addFollower = async(req,res)=>{
    const {id,userId}=req.body
    try {
        const user =  await User.findById(id)
        let flag=0
        for(let i of user.followers){
            if(i==userId){
                flag=1
                break;
            }
        }
    
        if(flag!=1){
                 user.followers.push(userId)
        }
        await user.save()
        res.status(200).json("success")
    } catch (err) {
        res.status(500).send(err.message)
    }
}