const { validateToken } = require("../utils/authentication")

function isLoggedIn(req,res,next){
  const getCookie = req.cookies.sidToken;
  if(!getCookie){
    res.redirect("/")
  }
  else{
    next()
  }
}

function checkJwtToken(cookiename){
  return (req,res,next)=>{
  const getToken = req.cookies.sidToken;
  const valiToken = validateToken(getToken)
  try{
    if(!valiToken){
      return Error("Token invalid ..")
    }
    else{
      req.memberUser = valiToken;
      //console.log(req.memberUser)
      next()
    }
  }
  catch(err){
    console.error("error while tokennn")
  }
  
  }
}

module.exports = {
  isLoggedIn,
  checkJwtToken
}