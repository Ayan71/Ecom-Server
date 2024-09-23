import express from "express"
import { registerControllers,loginControllers, getUserProfileControllers, logoutControllers } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/authMiddlewares.js";

//router object
const router=express.Router();

//routes


//register
router.post("/register",registerControllers)

//login
router.post('/login',loginControllers)


//profile
router.get('/profile',isAuth,getUserProfileControllers)

//logout
router.get('/logout',isAuth,logoutControllers)
//export 
export default router