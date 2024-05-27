const JWT=require('jsonwebtoken');
require("dotenv").config()



const verifyToken=(req,res,next)=>{

    const token=req.cookies.Token
    if(!token){return res.status(401).send("You are not authorized")}
    JWT.verify(token,process.env.SECRET_KEY,(err,user)=>{
        if(err){return res.status(401).send("invalid token")}
        req.user=user
        next()
    })
}

const verifyTokenAndAdmin=(req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin ){
            next()
        } else {
            console.log(req.user.id)
            console.log(req.user.isAdmin)
            return res.status(401).send("You are not authorized")
        }
    })
}

const verifyTokenAndAuthorized=()=>{
    verifyToken(req,res,()=>{
        if(req.user.id===req.params.id || req.user.isAdmin ){
            next()
        } else {
            return res.status(401).send("You are not authorized")
        }
    })
}


module.exports={verifyToken,verifyTokenAndAdmin,verifyTokenAndAuthorized}