import express from "express"
import dotenv from "dotenv"
import userModel from "../../models/User.js"
dotenv.config

const router = express.Router()

router.post("/register", async (req,res) =>{
    try {
        let userDetails = req.body
        let Database = await userModel.find()
        let checkEXists = Database.find((item) => item.email == userDetails.email)
        if(checkEXists){
            return res.status(400).json({
                msg: "user already exists"
            })
        }
        userModel.create(userDetails)
        res.status(201).json({
            msg : "user created successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg : "internal server error"
        })
    }
})

export default router