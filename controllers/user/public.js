import express from "express";
import userModel from "../models/User.js";

const router = express.Router();

router.get("/all-users", async (req, res) => {
    try {
        let users = await userModel.find();
        res.status(200).json(users);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
});

router.post("/register", async (req, res) => {
    try {
        let userDetails = req.body;

    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
});

export default router;