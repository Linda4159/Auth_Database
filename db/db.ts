import mongoose from "mongoose"

const url:string ="mongodb://0.0.0.0:27017/UserAuth";

mongoose.connect(url).then(()=>{
    console.log("auth succesfully connected")
}).catch((error)=>{
    console.log("there is an error here")
})
export default mongoose