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

//middleware
app.use(morgan('dev'))
app.use(express.json())
app.use(cors())


//routes
app.use("/api/v1",router)
app.use("/api/v1/user",userRoutes)


//dot env config
dotenv.config()

//database connection 
connectDB();


app.get('/', (req, res) => {
    return res.status(200).send("<h1>aello world</h1>")
})
const PORT=process.env.PORT || 8090;

app.listen(port, () => {
  console.log(`Server is running on ${PORT}`.bgRed.white)
})