const express = require('express')
const dotenv = require('dotenv')
const app = express()
const path=require('path')
const mongoose=require("mongoose")
const cors=require("cors")
const userRoutes = require('./routes/user.js')
const postRoutes = require('./routes/post.js')
dotenv.config()

const DATABASE_URL =process.env.DB
mongoose.connect(DATABASE_URL,{useNewUrlParser:true,useUnifiedTopology:true})
.then( () => {
    console.log("Connection open")
}).catch(err => {
    console.log("OOPS !! ERROR")
})
app.use(express.static(path.join(__dirname, "/public")))


app.use(express.json({extended:true}))
app.use(express.urlencoded({ extended: true }));


app.use(cors())
app.use('/user',userRoutes)
app.use('/post',postRoutes)
app.get('/',(req,res)=>{
    res.send('KEC_MEDIA SERVER')
})

const PORT = process.env.PORT || 8080
app.listen(PORT,()=> console.log(`server is running on Port ${PORT}`))

