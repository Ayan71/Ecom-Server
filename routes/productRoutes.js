import express from "express"
import { isAuth } from "../middlewares/authMiddlewares.js"
import { createProductControllers, deleteProductController, deleteProductImageController, getAllProductsControllers, getSingleProductControllers, updateProductControllers, updateProductImageController } from "../controllers/productControllers.js";
import { singleUpload } from "../middlewares/multer.js";


const router=express.Router();

//routes
//get all product
router.get("/get-all",getAllProductsControllers)
router.get("/:id",getSingleProductControllers)
router.post('/create',isAuth,singleUpload,createProductControllers)
router.put('/:id',isAuth,updateProductControllers)

// UPDATE PRODUCT IMAGE
router.put(
    "/image/:id",
    isAuth,
    singleUpload,
    updateProductImageController
  );
  
  // delete product image
  router.delete(
    "/delete-image/:id",
    isAuth,
    deleteProductImageController
  );
  //delete product 
  router.delete("/delete/:id",isAuth,deleteProductController)
export default router
