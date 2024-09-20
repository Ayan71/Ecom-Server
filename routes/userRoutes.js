import express from "express"
import { registerControllers,loginControllers } from "../controllers/userControllers.js";

//router object
const router=express.Router();

//routes


//register
router.post("/register",registerControllers)

//login
router.post('/login',loginControllers)

//export 
export default router