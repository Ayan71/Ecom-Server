import JWT from "jsonwebtoken";
import UserModel from "../models/userModel.js";
export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  //validate
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "UnAuthorized User",
    });
  }
  const decodeData = JWT.verify(token, process.env.JWT_SECRET);
  req.user = await UserModel.findById(decodeData);
  next();
};
