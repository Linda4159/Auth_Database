import UserModel from "../Model/UserModel";
import express,{Request,Response} from "express"
import bcrypt from 'bcrypt'
import Jwt from "jsonwebtoken";

export const userRegister = async(req:Request,res:Response):Promise<Response>=>{
try{
    const{FullName,LastName,Email,Password,Gender,isActive} = req.body
    if(!FullName || !LastName || !Password || !Email || !Gender || !isActive){
        return res.status(400).json({message:"all fields required"})
    }
    const checkEmail = await UserModel.findOne({Email:Email})
    if(checkEmail){
      return res.status(404).json({meassage:"email already in use"})  
    }
    const salt = await bcrypt.genSalt(20)
    const hashPassword = await bcrypt.hash(Password,salt)
    const userInfo = await UserModel.create({
        FullName,
        LastName,
        Email,
        Password:hashPassword,
        Gender,
        isActive:true
    })
return res.status(201).json({
    success:1,
    message:"user profile successfully created",
    data:userInfo
})
}catch(error:any){
    return res.status(404).json({message:error.message})
}
}
export const userLogin = async (req:Request,res:Response):Promise<Response>=>{
try{
    const {Email,Password} = req.body
    if(!Email || !Password){
        return res.status(500).json({message:"please fill all fields"})
    }
        const checkEmail:any = await UserModel.findOne({Email:Email})
    console.log(checkEmail)
    if(checkEmail){
        const checkPassword = await bcrypt.compare(Password,checkEmail.Password)
        if(checkPassword){
            const token:any = Jwt.sign({_id:checkEmail._id,FullName:checkEmail.FullName},"luckytoheebmaulushgideonfred",{expiresIn:"5m"})
            console.log(token)
            res.cookie("sessionId",token)
            console.log(req.headers["cookie"])
            return res.status(200).json({
                success:1,
                message:"login successful"
            })
        }else{
            return res.status(500).json({message:"incorrect password"})
        }
    }else{
        return res.status(500).json({message:"user not found"})
    }
    
    

}catch(error:any){
    return res.status(404).json({message:error.message})
}
}