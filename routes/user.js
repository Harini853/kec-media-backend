const express=require('express')
const {signUp,getAllUsers,login,updateDetails,updatePassword,updatePhoto,myDetails, addFollower} = require('../controllers/user')
const router = express.Router();
const { storage, fileFilter } = require("../multer/profile")
const multer = require('multer');
const upload = multer({ limits: { fileSize: 2097152 }, fileFilter: fileFilter, storage: storage })

router.get('/:id',myDetails)
router.get('/',getAllUsers)
router.post('/signup',upload.single('photo'),signUp)
router.post('/login',login)
router.patch('/updateProfile',upload.single('photo'),updatePhoto)
router.patch('/updateDetails',updateDetails)
router.patch('/updatePassword',updatePassword)
router.patch('/updateFollower',addFollower)

module.exports=router;