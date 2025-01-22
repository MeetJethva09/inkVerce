const {Router} = require('express')
const user = require("../models/users")
const blog   = require("../models/blogs")
const {isLoggedIn  , checkJwtToken} = require("../middlewares/authcheck")
const router = Router()

router.get("/signin" , (req,res)=>{
    res.render('signin')
})

router.get("/signup" , (req,res)=>{
    res.render('signup')
})

router.get("/member" , isLoggedIn , checkJwtToken('sidToken') ,async (req,res)=>{
    const allblogs = await blog.find({})
    res.render('member',{memberUser : req.memberUser , allblogs : allblogs})
})

router.post("/signupuser" , async (req,res)=>{
    const {fullName , email , password} = req.body;
    const createUser = await user.create({
        fullName ,
        email , 
        password
    });
    res.redirect("/user/signin")
})

router.post("/signinuser" , async (req,res)=>{
    const {email , password} = req.body;
    try{

        const jwtToken = await user.comparePasswordAndGenerateJwtToken(email , password)
        res.cookie('sidToken' , jwtToken)
        res.redirect("/user/member")

    }
    catch(error){
        res.render('signin',{error : "Invalid Email Or Password !!!"})
    }
})

router.get("/logout" ,(req,res)=>{
    res.clearCookie('sidToken').redirect("/")
})




module.exports = router;