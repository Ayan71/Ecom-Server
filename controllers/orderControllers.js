
import {stripe} from "../server.js";
import orderModel from "../models/orderModel.js";
import productModel from "../models/productModel.js";


//CREATE ORDERS
export const createOrderController = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      shippingCharges,
      totalAmount,
      orderStatus,
    } = req.body;

    if(  !shippingInfo||
        !orderItems ||
        !paymentMethod||
        !paymentInfo||
        !itemPrice||
        !shippingCharges||
        !totalAmount||
       ! orderStatus){
        return res.status(401).json({
            success: false,
            message: "fill all field",
          });
       }
       await orderModel.create({
      
        shippingInfo,
      orderItems,
      paymentMethod,
      paymentInfo,
      itemPrice,
      shippingCharges,
      totalAmount,
      orderStatus,
      user:req.user._id,
       })
    //      // stock update
    // for (let i = 0; i < orderItems.length; i++) {
    //     // find product
    //     const product = await productModel.findById(orderItems[i].product);
    //     product.stock -= orderItems[i].quantity;
    //     await product.save();
    //   }
      res.status(201).send({
        success: true,
        message: "Order Placed Successfully",
      });
  } catch (error) {
    console.log(error,"--------------->");
    return res.status(500).json({
      success: false,
      message: "Error is create order Api",
    });
  }
};
export const getAllOrderController=async(req,res)=>{
  try{
    //find order
    const orders=await orderModel.find({user:req.user._id});
    if(!orders){
      return res.status(404).json({
        success: false,
        message: "order not found",
      });
  

    }
    return res.status(200).json({
      success: true,
      totalOrder:orders.length,
      orders,
      message: "all order fetch",
    });

  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error is get  All order Api",
    });

  }

}

export const getSingleOrderDetails=async(req,res)=>{
  try{
    const order= await orderModel.findById(req.params.id);
    if(!order){
      return res.status(404).json({
        success: false,
        message: "not found",
      });
  
    }



    return res.status(200).json({
      success: true,
      order,
      message: "single order fetch",
    });

   
  }
  catch(error){
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error is get  single order Api",
    });

  }
}

export const paymentController = async (req, res) => {
  try {
    // get ampunt
    const { totalAmount } = req.body;
    // validation
    if (!totalAmount) {
      return res.status(404).send({
        success: false,
        message: "Total Amount is require",
      });
    }
    const { client_secret } = await stripe.paymentIntents.create({
      amount: Number(totalAmount * 100),
      currency: "usd",
    });
    res.status(200).send({
      success: true,
      client_secret,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Get UPDATE Products API",
      error,
    });
  }
};