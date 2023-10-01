import mongoose from "mongoose"

interface Auser{
    FullName:string,
    LastName:string,
    Email:string,
    Password:string
    Gender:string
    isActive:boolean
}
interface iAuser extends Auser,mongoose.Document{}

const ASchema = new mongoose.Schema({
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
        lowercase:true
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
    }
},{
    timestamps:true
})
export default mongoose.model<iAuser>("user",ASchema)