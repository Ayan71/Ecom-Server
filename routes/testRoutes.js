import express from  "express"
import { textControllerds } from "../controllers/textControllers.js";
//router object
const router=express.Router();

//routes
router.get("/test",textControllerds)


//export
export default router