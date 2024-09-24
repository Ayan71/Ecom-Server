import express from "express"
import colors  from "colors"
import morgan from "morgan"
const app = express()
const port = 8080
import cors from "cors"
import dotenv from "dotenv"
import router from "./routes/testRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import { connectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import cloudinary  from "cloudinary"
//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())
app.use(cookieParser())

//routes
app.use("/api/v1",router)
app.use("/api/v1/user",userRoutes)


//dot env config
dotenv.config()

//database connection 
connectDB();

//cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.get('/', (req, res) => {
    return res.status(200).send("<h1>aello world</h1>")
})
const PORT=process.env.PORT || 8090;

app.listen(port, () => {
  console.log(`Server is running on ${PORT} on ${process.env.Node_Env}`.bgRed.white)
})