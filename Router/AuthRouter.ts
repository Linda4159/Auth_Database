import express,{Router} from "express"
import {regUser, login} from "../Controller/AuthController"

const router = express.Router()

router.route("/user-reg").post(regUser)
router.route("/user-login").post(login)

export default router