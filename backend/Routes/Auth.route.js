import { Router } from "express";
import { signupValidation, loginValidation } from "../Middlewares/validation.js"
import { signup, login } from "../Controllers/Auth.controller.js";

const router = Router();


router.post("/signup", signupValidation, signup)

router.post("/login", loginValidation, login)


export default router;