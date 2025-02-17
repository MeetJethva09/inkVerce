require('dotenv').config()
const express = require('express')
const path = require('path')
const app = express()
const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")
const blog= require("./models/blogs")
const mongoose = require("mongoose")
const {checkJwtToken , isLoggedIn} = require("./middlewares/authcheck")
const cookieParser = require('cookie-parser')


let port = process.env.PORT || 3000

mongoose.connect(process.env.MONGOURL).then((console.log("Database connectivity successfull..")))
.catch((e)=>{
    console.log(`Error while connecting database connectivity...${e}`)
})

app.use(cookieParser())

app.use(express.urlencoded({extended: true}))

app.set('view engine' , 'ejs')

app.use(express.static(path.join(__dirname , 'public')))

app.use("/user" , userRouter)
app.use("/blog" , blogRouter)
  

app.get("/" , async (req,res)=>{
    const allblogs = await blog.find()
    res.render('home', {allblogs : allblogs})
})

app.head('/static-check', (req, res) => {
    // Set headers for the static check response
    res.status(200).set('Custom-Header', 'StaticCheckCompleted').end(); // No body, just headers
});


app.listen(port , (req,res)=>{
    console.log(`server intialized at http://localhost:${port}`);  
})
