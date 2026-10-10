import { MongoServerClosedError, Timestamp } from "mongodb";
import mongoose  from "mongoose";

let userSchema =  new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim: true
    },
    email : {
        type: String,
        required: true,
        trim : true,
        unique: true 

    },
    password: {
        type: String,
        required: true,
        trim: true
    }
}, {timestamps: true})

let userModel = mongoose.model("user", userSchema)

export default userModel