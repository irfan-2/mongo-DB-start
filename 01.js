import express from "express"
import dotenv from "dotenv"
dotenv.config()
import "./utils/connectDB.js"
import router from "./controllers/user/public.js"
const app = express()
app.use(express.json())
const port = process.env.PORT
app.get("/health", (req,res) =>{
    res.status(200).json({
        msg : "APIs are running"
    })
})

app.use("/user", router)

app.listen(port ,() =>{
    console.log(`server is running on port ${port}`);
    
})