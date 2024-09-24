import UserModel from "../models/userModel.js";
import {getDataUri} from "../utils/features.js"
//REGISTER
export const registerControllers = async (req, res) => {
  try {
    const { name, email, password, address, city, country, phone } = req.body;
    //validation
    if (
      !name ||
      !email ||
      !password ||
      !address ||
      !city ||
      !country ||
      !phone
    ) {
      return res.status(500).json({
        success: false,
        message: "Please Provide All fields",
      });
    }

    //check existing user
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "Email already register",
      });
    }

    const user = await UserModel.create({
      name,
      email,
      password,
      address,
      city,
      country,
      phone,
    });
    return res.status(201).json({
      success: true,
      message: "Registration success",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in register API ",
    });
  }
};
//LOGIN
export const loginControllers = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(500).json({
        success: false,
        message: "Please All Email OR Password",
      });
    }

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "User Not Found",
      });
    }

    //check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(500).json({
        success: false,
        message: "Invalid credentials",
      });
    }
    //token
    const token = user.generateToken();
    return res
      .status(200)
      .cookie("token", token, {
        expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 100),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
        secure: process.env.Node_Env === "development" ? true : false,
      })
      .json({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Error in Login Api",
    });
  }
};

export const getUserProfileControllers = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user._id);
    user.password = undefined;
    return res.status(200).json({
      success: true,
      message: "User Profile Fecthed Sucessfully",
      user,
    });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error in Profile Api",
      error,
    });
  }
};
export const logoutControllers = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        secure: process.env.NODE_ENV === "development" ? true : false,
        httpOnly: process.env.NODE_ENV === "development" ? true : false,
        sameSite: process.env.NODE_ENV === "development" ? true : false,
      })
      .json({
        success: true,
        message: "Logout Successfully",
      });
  } catch (error) {
    console.log(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error in Logout Api",
      error,
    });
  }
};
//UPDATE USER PROFILE
export const updateProfileControllers=async(req,res)=>{
  try{
    const user=await UserModel.findById(req.user._id)
    const {name, email, address, city, country, phone}=req.body;
    if(name) user.name=name;
    if(email) user.email=email;
    if(address) user.address=address;
    if(city) user.city=city;
    if(country) user.name=country;
    if(phone) user.name=phone;

    //sava user
    await user.save();
    return res.status(200).json({
      sucess:true,
      message:"User Porfile Updated"
    })

  }
  catch(error){
    console.log(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error in Logout Api",
      error,
    });

  }

}

//update password
export const updateUserPassword=async(req,res)=>{
  try{

     const user=await UserModel.findById(req.user._id);
     const {oldPassword,newPassword}=req.body;
     if(!oldPassword || !newPassword){
      return res.status(500).json({
        sucess:false,
        message:"Please check old or new password"

      })
     }

     //check old pass
     const isMatch=await user.comparePassword(oldPassword);
     //validation
     if(!isMatch){
      return res.status(500).json({
        sucess:false,
        message:"invalid  old password"

      })
     }
     user.password=newPassword;
     await user.save();
      return res.status(200).json({
      sucess:true,
      message:"Password update successfully"
    })
  }
  catch(error){
    console.log(error, "error");
    return res.status(500).json({
      success: false,
      message: "Error in update password Api",
      error,
    });


  }

}
export const updateProfilePicController = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    // file get from client photo
    const file = getDataUri(req.file);
    // delete prev image
    // await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
    // update
    const cdb = await cloudinary.v2.uploader.upload(file.content);
    user.profilePic = {
      public_id: cdb.public_id,
      url: cdb.secure_url,
    };
    // save func
    await user.save();

    res.status(200).send({
      success: true,
      message: "profile picture updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In update profile pic API",
      error,
    });
  }
};
