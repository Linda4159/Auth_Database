import authModel from "../Model/AuthModel"
import express,{Request,Response} from "express"
import bcrypt from "bcrypt"

export const regUser = async(req:Request,res:Response):Promise<Response>=>{
try{
const {fullName,email,password} = req.body
if(!fullName || !email || !password)
{
    return res.status(404).json({message:"please fill all fields"})
}
const checkEmail = await authModel.findOne({email:email})
if(checkEmail){
    return res.status(404).json({message:"email already in use"})
}
const salt = await bcrypt.genSalt(10)
const hashedPassword = await bcrypt.hash(password,salt)

const userData = await authModel.create({
    fullName,
    email,
    password:hashedPassword,
    isActive:true
})
return res.status(201).json({
    success:1,
    message:"user successfully registered",
    data:userData
})
}catch(error:any){
    return res.status(404).json({error:error.message})
}
}
export const  login = async(req:Request,res:Response):Promise<Response>=>{
try{
    const {email,password}=req.body
    if(!email || !password)
    {
        return res.status(404).json({message:"all fields required"})
    }
    const checkEmail:any = await authModel.findOne({email:email})
    console.log(checkEmail)
    if(checkEmail)
    {
        const checkPassword = await bcrypt.compare(password,checkEmail.password)
        if(checkPassword)
        {
            const {password,isActive,...info} = checkEmail._doc
            return res.status(200).json({
                message:"login successful",
                result:info
            })
        }else{
            return res.status(404).json({message:"incorrect password"})
        }
    }else{
        return res.status(404).json({message:"user not"})
    }

}catch(error:any){
    return res.status(404).json({error:error.message})
}
}
