import express,{ Router } from "express"
import jwt from "jsonwebtoken"
import { userLogin, userRegister } from "../Controller/UserController"
import { JsonWebTokenError } from "jsonwebtoken"


const router = express.Router()

const authoriseToken = async(req:any,res:any,next:any)=>{
const getSession = req.headers["cookie"]
if(!getSession){
return res.status(401).json({message:"please login to generate your token"})
}
const cookieToken = await getSession.split("=")
console.log("rezi",cookieToken)
if(cookieToken){
const tokenss = await cookieToken
jwt.verify(tokenss,"luckytoheebmaulushgideonfred",(err:any,payload:any)=>{
    if(err){
       return res.status(500).json({message:"token has expired"}) 
    }
    res.user=payload
    next()
})
}else{
return res.status(500).json({message:"invalid token"})
}
}

router.route("/user-registration").post(userRegister)
router.route("/user-login").post(userLogin)



export default router