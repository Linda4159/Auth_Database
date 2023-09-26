import mongoose from "mongoose";

interface userA {
  fullName: string;
  email: string;
  password: string;
  isActive: boolean;
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
  },
  {
    timestamps: true,
  }
);
export default mongoose.model<iuserA>("users", userSchema);
