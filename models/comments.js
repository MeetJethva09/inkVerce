const {Schema , model} = require('mongoose')

const commentSchema = new Schema({
    content : {
        type : String,
    },
    blogId :{
        type : Schema.Types.ObjectId,
        ref : "Blog",
        
    },
    userId : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },

} , {timestamps : true})

const comment = model('comment' , commentSchema)

module.exports = comment