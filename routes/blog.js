const {Router} = require('express')
const multer = require("multer")
const blog = require("../models/blogs")
const commentt = require("../models/comments")
const {isLoggedIn , checkJwtToken} = require("../middlewares/authcheck")
const router = Router()


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}${file.originalname}`;
      cb(null, filename)
    }
  })
  
  const upload = multer({ storage: storage })



router.get("/newblog" ,isLoggedIn, checkJwtToken('sidToken'), (req,res)=>{
    res.render('addblog', {memberUser : req.memberUser})
})

router.post("/createblog" , upload.single("coverImage") ,checkJwtToken('sidToken') , async (req,res)=>{
    const { coverImage , title , body} = req.body
    const createBlog = await blog.create({
        title,
        body,
        coverImage : `/uploads/${req.file.filename}`,
        createdBy : req.memberUser._id
    })
    res.redirect('/user/member')
})

router.get("/delete/:did" , async (req,res)=>{
  const deleteBlog = await blog.findOneAndDelete({_id : req.params.did})
  res.redirect('/user/member')
})
 
router.get("/view/:vid" , isLoggedIn,checkJwtToken('sidToken') , async (req,res)=>{
    const findblog = await blog.findOne({_id : req.params.vid}).populate('createdBy')
    const findcomment = await commentt.find({blogId : req.params.vid}).populate('userId')
    
    res.render('showblog' , {memberUser : req.memberUser , findblog :findblog ,findcomment : findcomment})
})



router.post("/addcomment/:blogid" , isLoggedIn , checkJwtToken('sidToken') , async (req,res)=>{
  const createComment =   await commentt.create({
      content : req.body.comment,
      blogId : req.params.blogid,
      userId : req.memberUser._id
    })

    res.redirect(`/blog/view/${req.params.blogid}`)
})


module.exports = router;

