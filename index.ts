import "./db/db"
import express,{Application,Request,Response} from "express"
import cors from "cors"
import authRouter from "./Router/AuthRouter"
import userRouter from "./Router/UserRouter"
import studentAuthRouter from "./Router/studentAuthRouter"
import morgan from "morgan"
import jwt from "jsonwebtoken"



const app = express()
const port:number = 2020

app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use("/api/v1",authRouter)
app.use("/api/v1",userRouter)
app.use("/api/v1",studentAuthRouter)
app.use("/uploads",express.static("uploads"))


const server = app.listen(port,()=>{
    console.log("this is port",port)
})

process.on("uncaughtException",(error:any)=>{
    console.log("uncaught exception error")
    process.exit(1)
})
process.on("unhandledRejection",(reason)=>{
    console.log("unhandled errorr")
    console.log("reason",reason)
    process.exit(1)
})