import productModel from "../models/productModel.js";
import cloudinary from "cloudinary";
import { getDataUri } from "../utils/features.js";

export const getAllProductsControllers = async (req, res) => {
  try {
    const product = await productModel.find({});
    return res.status(200).json({
      success: true,
      message: "All product fetch successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "Error in Get all product api",
    });
  }
};
export const getSingleProductControllers = async (req, res) => {
  try {
    //get product id
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "product not found",
      });
    }

    return res.status(200).json({
      sucess: true,
      message: "Product found",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      sucess: false,
      message: "Error in Get single product api",
    });
  }
};

// CREATE PRODUCT

export const createProductControllers = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    // // validtion
    if (!name || !description || !price || !stock) {
      return res.status(500).send({
        success: false,
        message: "Please Provide all fields",
      });
    }
    //   if (!req.file) {
    //     return res.status(500).send({
    //       success: false,
    //       message: "please provide product images",
    //     });
    //   }
    //   const file = getDataUri(req.file);
    //   const cdb = await cloudinary.v2.uploader.upload(file.content);
    //   const image = {
    //     public_id: cdb.public_id,
    //     url: cdb.secure_url,
    //   };

    await productModel.create({
      name,
      description,
      price,
      category,
      stock,
      // images: [image],
    });

    res.status(201).send({
      success: true,
      message: "product Created Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In create Products API",
      error,
    });
  }
};
//UPDATE PRODUCT

export const updateProductControllers = async (req, res) => {
  try {
    //find product
    const product = await productModel.findById(req.params.id);
    //validation
    if (!product) {
      res.status(402).send({
        success: false,
        message: "product not found",
      });
    }
    const { name, description, price, category, stock } = req.body;
    //validate and update
    if(name)product.name=name
    if(description)product.description=description
    if(price)product.price=price
    if(category)product.category=category
    if(stock)product.stock=stock


    await product.save()
    res.status(200).send({
      success: true,
      message: "product details updated Successfully",
    });
  } catch (error) {
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update  Products API",
      error,
    });
  }
};


//update product name

// UPDATE PRODUCT IMAGE
export const updateProductImageController = async (req, res) => {
    try {
      // find product
      const product = await productModel.findById(req.params.id);
      // valdiation
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product not found",
        });
      }
      // check file
      if (!req.file) {
        return res.status(404).send({
          success: false,
          message: "Product image not found",
        });
      }
  
      const file = getDataUri(req.file);
      const cdb = await cloudinary.v2.uploader.upload(file.content);
      const image = {
        public_id: cdb.public_id,
        url: cdb.secure_url,
      };
      // save
      product.images.push(image);
      await product.save();
      res.status(200).send({
        success: true,
        message: "product image updated",
      });
    } catch (error) {
      console.log(error);
      // cast error ||  OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get UPDATE Products API",
        error,
      });
    }
  };

  // DELETE PROEDUCT IMAGE
  export const deleteProductImageController = async (req, res) => {
    try {
      // find produtc
      const product = await productModel.findById(req.params.id);
      // validatin
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "Product Not Found",
        });
      }
  
      // image id find
      const id = req.query.id;
      if (!id) {
        return res.status(404).send({
          success: false,
          message: "product image not found",
        });
      }
  
      let isExist = -1;
      product.images.forEach((item, index) => {
        if (item._id.toString() === id.toString()) isExist = index;
      });
      if (isExist < 0) {
        return res.status(404).send({
          success: false,
          message: "Image Not Found",
        });
      }
      // DELETE PRODUCT IMAGE
      await cloudinary.v2.uploader.destroy(product.images[isExist].public_id);
      product.images.splice(isExist, 1);
      await product.save();
      return res.status(200).send({
        success: true,
        message: "Product Image Dleteed Successfully",
      });
    } catch (error) {
      console.log(error);
      // cast error ||  OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get DELETE Product IMAGE API",
        error,
      });
    }
  };

  //Delete product 
  export const deleteProductController = async (req, res) => {
    try {
      // find product
      const product = await productModel.findById(req.params.id);
      // validation
      if (!product) {
        return res.status(404).send({
          success: false,
          message: "product not found",
        });
      }
      
      // find and delete image cloudinary
      for (let index = 0; index < product.images.length; index++) {
        await cloudinary.v2.uploader.destroy(product.images[index].public_id);
      }
      await product.deleteOne();
      res.status(200).send({
        success: true,
        message: "Product Deleted Successfully",
      });
    } catch (error) {
      console.log(error);
      // cast error ||  OBJECT ID
      if (error.name === "CastError") {
        return res.status(500).send({
          success: false,
          message: "Invalid Id",
        });
      }
      res.status(500).send({
        success: false,
        message: "Error In Get DELETE Product IMAGE API",
        error,
      });
    }
  };
  