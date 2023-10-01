import studentModel from "../Model/studentModel";
import express, { Request, Response } from "express";
import bcrypt from "bcrypt";

export const registerStudent = async (
  req: any,
  res: Response
): Promise<Response> => {
  try {
    const { FullName, LastName, Email, Gender, Password } = req.body;
    if (!FullName || !LastName || !Email || !Password || !Gender) {
      return res.status(404).json({ message: "all fields required" });
    }
    const checkEmail = await studentModel.findOne({ Email: Email });
    if (checkEmail) {
      return res.status(404).json({
        success: 0,
        message: "email already in use",
      });
    }
    if(!req.file){
        return res.status(401).json({message:"please upload an image"})
    }
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(Password, salt);
    const studentReg = await studentModel.create({
      FullName,
      LastName,
      Email,
      Password: hashed,
      Gender,
      isActive: true,
      profileImage: req.file.filename,
    });
    return res.status(201).json({
      succes: 1,
      message: "registration successful",
      result:studentReg
    });
  } catch (error: any) {
    return res.status(400).json({
      message: "registration failed",
      error: error.message,
    });
  }
};
