import express from "express"
import { registerControllers,loginControllers, getUserProfileControllers, logoutControllers, updateProfileControllers, updateUserPassword, updateProfilePicController } from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/authMiddlewares.js";
import { singleUpload } from "../middlewares/multer.js";

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

//update profile
router.put('/profile-update',isAuth,updateProfileControllers)

//update passwprd
router.put("/update-password",isAuth,updateUserPassword)

//update profile 
router.put('/update-picture',isAuth,singleUpload,updateProfilePicController)
//export 
export default router