import mongoose from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "emaill is required"],
    },
    password: {
      type: String,
      require: [true, "password is required"],
      minLength: [6, "password should be greather then 6 character"],
    },
    address: {
      type: String,
      required: [true, "address is require"],
    },
    city: {
      type: String,
      required: [true, "city is required"],
    },
    country: {
      type: String,
      required: [true, "country name is required"],
    },
    phone: {
      type: String,
      required: [true, "phone no is required"],
    },
    profilePic: {
      type: String,
    },
  },
  { timestamps: true }
);
//functions
//hash func

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});
//compare function
userSchema.methods.comparePassword = async function (plainpassword) {
  return await bcrypt.compare(plainpassword, this.password);
};

//JWt Token
userSchema.methods.generateToken=
  function () {
    return JWT.sign({ _id: this._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };

export const UserModel = mongoose.model("Users", userSchema);
export default UserModel;
