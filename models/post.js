const mongoose = require('mongoose')
const {Schema}=mongoose

const postSchema = new Schema({
    description:String,
    image:String,
    postedBy:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    postedOn:{
        type:Date,
        default:Date.now
    },
    likes:[
        {
            type:Schema.Types.ObjectId,
            ref:'User'
        }
    ],
    comment:[
        {
            commentedBy:{
                type:Schema.Types.ObjectId,
                ref:"User"
            },
            content:{
                type:String
            },
            postedOn:{
                type:Date,
                default:Date.now
            }
        }

    ]
})

module.exports = mongoose.model('Post',postSchema)