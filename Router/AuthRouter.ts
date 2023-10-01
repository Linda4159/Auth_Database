import express,{Router} from "express"
import jwt from "jsonwebtoken"
import {regUser, login, getUser, logOut} from "../Controller/AuthController"

const router = express.Router()


const verifyToken = async(req:any,res:any, next:any) =>{
    const getSession = req.headers["cookie"]
    if(!getSession)
    {
        return res.status(404).json({
            message:"please login to get token"
        })
    }
    const tokenCookies = await getSession.split("=")[1]
    console.log("linda",tokenCookies)
    if(tokenCookies)
    {
        const tokens = await tokenCookies
        jwt.verify(tokens, "komelindaivannaamanda", (err:any,payload:any)=>{
            if(err)
            {
                return res.status(404).json({message:"token expire"})
            }
            req.user = payload
            next()
        })
    }else{
        return res.status(404).json({
            message:"please provide a valid token"
        })
    } 
}

router.route("/user-reg").post(regUser)
router.route("/user-login").post(login)
router.route("/logout-user").get(logOut)
router.route("/all-users").get(verifyToken,getUser)

export default router