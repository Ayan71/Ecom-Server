import mongoose from "mongoose";
import colors from "colors"

export const connectDB= async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Mongodb Connected Successfully")

    }
    catch(error){
        console.log("Mongodb Error",error.bgRed.white)
    }
}