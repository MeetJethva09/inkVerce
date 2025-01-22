const jwt = require('jsonwebtoken')

const secretkey = process.env.SECRETKEY

function createJwtTokens(user){
    const payload = {
        _id : user._id,
        fullName : user.fullName,
        email : user.email,
        profileUrl : user.profileImage,
        role : user.role
    }
    const token = jwt.sign(payload, secretkey)
    return token;
} 

function validateToken(token){
    const payload = jwt.verify(token , secretkey)
    return payload;
}

module.exports = {
    createJwtTokens,
    validateToken
}