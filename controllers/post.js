const mongoose = require('mongoose')
const Post=require('../models/post')
const User=require('../models/user')
module.exports.getAllPosts = async(req,res)=>{
    try {
        const posts = await Post.find().populate('postedBy').populate({path:'comment',populate:{
            path:'commentedBy'
        }});
        const allPosts =[...posts].reverse()
        console.log(allPosts)
        res.status(200).json(allPosts)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg:err.message})
    }
}

module.exports.newPost=async(req,res)=>{
    const {id,description}=req.body;
    console.log(id)
    try {
        const user = await User.findById(id);
        console.log(user)
        const newPost = new Post({description})
        newPost.image=req.file.path.substring(6)
        newPost.postedBy=user._id
        user.posts.push(newPost._id)
        await user.save()
        await newPost.save();
        res.status(200).send('success')
    } catch (err) {
        console.log(err.message)
        res.status(500).json({msg:err.message})
    }
}


module.exports.getMyPosts =async(req,res)=>{
    const {id}=req.params
   try {
        const user = await User.findById(id).populate('posts');
        res.status(200).json(user)
        } catch (err) {
        res.status(500).send(err.message)
    }
}


module.exports.deletePost = async(req,res)=>{
    const {id}=req.params
    try {
        const post = await Post.findByIdAndDelete(id);
        
        res.status(200).send('success')
    } catch (err) {
        res.status(404).send(err.message)
    }
}


module.exports.likePost = async(req,res)=>{

    const {userId,id}=req.body
    try {
        const post = await Post.findById(id)
        let flag=0
        for(let i of post.likes){
            if(i==userId){
             
                flag=1
                break;
            }
        }
       
        if(flag!=1){
                 post.likes.push(userId)
        }
         await post.save();
        res.status(200).json({message:"Liked successfully..."})
        
    } catch (err) {
        console.log(err.message)
        res.status(400).json({message:err.message})
    }
}

module.exports.addComment = async(req,res)=>{
    const {id,content,userId}=req.body
    try {
        const post = await Post.findById(id);
        const user=await User.findById(userId)
        let comment ={
            commentedBy:user._id,
            content:content
    }
        post.comment.push(comment)
        await post.save()
        console.log(post)
        res.status(200).json("success")
    } catch (err) {
        res.status(500).json({msg:err.message})
    }
}