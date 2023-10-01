import mongoose from "mongoose"

interface student{
    FullName:string,
    LastName:string,
    Email:string,
    Password:string
    Gender:string
    isActive:boolean
    profileImage:string
}
interface istudent extends student,mongoose.Document{}

const studentSchema = new mongoose.Schema({
    FullName:{
        type:String,
        lowercase:true
    },
    LastName:{
        type:String,
        lowercase:true
    },
    Email:{
        type:String,
        lowercase:true,
        unique:true
    },
    Password:{
        type:String,

    },
    Gender:{
        type:String,
require:true
    },
    isActive:{
        type:Boolean
    },
    profileImage:{
      type:String
    }
},{
    timestamps:true
})
export default mongoose.model<student>("students",studentSchema)