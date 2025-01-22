const {Schema , model} = require('mongoose')
const bcrypt = require('bcrypt');
const { createJwtTokens } = require('../utils/authentication');
const userSchema = new Schema({
    fullName : {
        type : String,
        required :true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    profileImage : {
        type : String,
        default : '/images/user.webp'
    },
    role : {
        type : String,
        enum : ['USER' , 'ADMIN'],
        default : 'USER'
    }
},{timestamps : true})

userSchema.pre("save" , async function(next){
    const user = this;
    if(!user.isModified('password')) return;

    const hashP = await bcrypt.hash(user.password , 10)
        user.password = hashP;
        next()
})

userSchema.static("comparePasswordAndGenerateJwtToken" , async function(email , password){
    const findUser = await this.findOne({email})
    if(!findUser) throw new Error("User not found!!!")
    
    else{
    
        const isMatch = await bcrypt.compare(password , findUser.password)
        if(isMatch == true) {
            console.log(`matched!!!`)
            const jwtToken = createJwtTokens(findUser)
            return jwtToken
        }
        else{
            throw new Error('Not matched....')}
    }
})

const userModel = model('User' , userSchema)

module.exports = userModel;