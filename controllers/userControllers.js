import UserModel from "../models/userModel.js";
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
        secure: process.env.Node_Env === "development" ? true : false,
      })
      .json({
        success: true,
        message: "Login Successfully",
        token,
        user,
      });
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      success: false,
      message: "Error in Login Api",
    });
  }
};

export const getUserProfileControllers = async (req,res) => {
  try {
    const user=await UserModel.findById(req.user._id);
    user.password=undefined
    return res.status(200).json({
      success: true,
      message: "User Profile Fecthed Sucessfully",
      user
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
export const logoutControllers=async(req,res)=>{
  try{
    res.status(200).cookie("token","",{
      expires:new Date(Date.now())
    }).json({
      success:true,
      message:"Logout Successfully"
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
