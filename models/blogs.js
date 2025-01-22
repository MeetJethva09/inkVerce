const {Schema , model} = require('mongoose')

const blogSchema = new Schema({
    title: {type: String,
         required: true
        },
    body : {
        type : String,
        required :true
    },
    coverImage : {
        type : String,
    },
    createdBy : {
        type: Schema.Types.ObjectId,
        ref : 'User'
    }
} , {timestamps : true})

const blog = model('Blogs' , blogSchema)
module.exports = blog