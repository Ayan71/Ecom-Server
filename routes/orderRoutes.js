import express from "express";
import {isAuth} from "../middlewares/authMiddlewares.js"
import { createOrderController, getAllOrderController, getSingleOrderDetails, paymentController } from "../controllers/orderControllers.js";
const router=express.Router();

router.post('/create',isAuth,createOrderController)
router.get('/my-orders',isAuth,getAllOrderController)
router.get('/my-orders/:id',isAuth,getSingleOrderDetails)


//accept payments 
router.post('/payments',isAuth,paymentController)

export default router