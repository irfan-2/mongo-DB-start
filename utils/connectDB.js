import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()

async function connectDB(){
    try {
        const db_uri = process.env.mongoDB_URI
        await mongoose.connect(db_uri)
        console.log("Database connected successfully");
        
    } catch (error) {
        console.error(error.message);
        
    }
}

connectDB()