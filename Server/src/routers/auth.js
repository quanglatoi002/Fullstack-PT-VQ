import express from "express";
import * as authController from "../controllers/auth";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
//when client api this it's run over function controllers and function controllers will call back register,
// in controller will check inside body it have {name, phone, password} or not

export default router;
