import mongoose from "mongoose";

interface userA {
  fullName: string;
  email: string;
  password: string;
  isActive: boolean;
  profileImage:string
}
interface iuserA extends userA, mongoose.Document {}

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    isActive: {
      type: Boolean,
    },
    profileImage:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<iuserA>("users", userSchema);
