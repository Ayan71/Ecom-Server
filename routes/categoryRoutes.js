import express from "express"
import { createCategory, deleteCategoryController, getAllCategoriesController, updateCategoryController } from "../controllers/categoryControllers.js";
import { isAuth } from "../middlewares/authMiddlewares.js";
const router=express.Router();

//  CREATE CATEGORY
router.post('/create',isAuth,createCategory)
router.get('/get-all',isAuth,getAllCategoriesController)
router.delete('/delete/:id',isAuth,deleteCategoryController)
router.put('/update/:id',isAuth,updateCategoryController)

export default router;