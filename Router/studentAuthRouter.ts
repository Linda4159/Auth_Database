import express, { Router } from "express"
import upload from "../Middleware/multer"
import { registerStudent } from "../Controller/studentAuthController"


const router = express.Router()

router.route("/reg-student").post(upload,registerStudent)

export default router
