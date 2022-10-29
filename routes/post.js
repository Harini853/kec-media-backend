const express = require('express')
const {deletePost,getAllPosts,newPost,getMyPosts, likePost, addComment}=require('../controllers/post')
const router = express.Router()
const { storage, fileFilter } = require("../multer/upload")
const multer = require('multer');
const upload = multer({ limits: { fileSize: 2097152 }, fileFilter: fileFilter, storage: storage })


router.get('/',getAllPosts)
router.post('/',upload.single('photo'),newPost)
router.get('/:id',getMyPosts)
router.delete('/:id',deletePost)
router.patch('/like',likePost)
router.patch('/comment',addComment)
module.exports=router