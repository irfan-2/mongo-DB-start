import express from "express";
import dotenv from "dotenv";
dotenv.config();

import "./utils/connectDB.js";
import userRouter from "./controllers/user/public.js";
import userModel from "./models/User.js";
const port = process.env.PORT;
const app = express();

app.use(express.json());

app.get("/health", (req, res) => {
    res.status(200).json({message: "APIs are working fine"});
});

// find() method => (filter, projection, options)
app.get("/find", async (req, res) => {
    try {
        let {password} = req.body;
        let user = await userModel.find({ password: password });
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
});

// insertOne() => (object) === create
app.post("/register", async (req, res) => {
    try {
        let userDetails = req.body;
        await userModel.insertOne(userDetails);
        res.status(201).json({message: "User created successfully", user: userDetails.name})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
});

//insertMany() => (array)
app.post("/register-many", async (req, res) => {
    try {
        let users = req.body;
        await userModel.insertMany(users);
        res.status(201).json({message: "User created successfully"})
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
});

// findById() => (string)
app.get("/find-by-id/:id", async (req, res) => {
    try {
        let userId = req.params.id;
        let user = await userModel.findById(userId);
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
});

// findOne() => (object)
app.get("/find-one", async (req, res) => {
    try {
        let {password} = req.body;
        let user = await userModel.findOne({password: password});
        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({Error: "Internal Server Error"});
    }
})

//countDocuments
app.get("/total-users", async (req,res) =>{
   try {
     let allUsers = await userModel.countDocuments()
    res.status(200).json({
        message : `total number of users are ${allUsers}`
    })
   } catch (error) {
    console.log(error);
    res.status(500).json({
        "msg" : "internal server error"
    })    
   }
})
// findByIdAndUpdate() => (id, update, options)
app.patch("/update-user/:id", async (req, res) => {
    try {
        let userID = req.params.id;
        let changes = req.body;

        let updateUser = await userModel.findByIdAndUpdate(
            userID,
            { $set: changes },
            { new: true }
        );

        if (!updateUser) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        res.status(200).json({
            msg: "User updated successfully",
            user: updateUser
        });

    } catch (error) {
        console.log(error.message);

        res.status(500).json({
            msg: error.message
        });
    }
});

// find one and update ()
app.patch("/update-user-findone/:email" , async (req,res) =>{
    try {
        let userEmail = req.params.email
        let updateUser = await userModel.findOneAndUpdate({email : userEmail}, {$set : changes}, {new : true})
        res.status(200).json({
            "msg" : "user was updated successfully"
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({
        "msg" : "internal server error"
    })  
    }
})

// find by id and delete ()
app.delete("/delete-id/:id", async (req,res) =>{
    try {
        let userID = req.params.id 
        let deleted = await userModel.findByIdAndDelete(userID)
        res.status(200).json({
            "msg" : "user was deleted "
        })
    } catch (error) {
        console.log(error);
    res.status(500).json({
        "msg" : "internal server error"
    })  
    }
})

// find one and delete ()
app.delete("/delete-find-one/:email", async (req,res) =>{
    try {
        let userEmail = req.params.id
    let deleted = await userModel.findOneAndDelete({email : userEmail})
    res.status(200).json({
        "msg" : "user deleted using email"
    })
    } catch (error) {
         console.log(error);
    res.status(500).json({
        "msg" : "internal server error"
    })    
    }
})

// find one and replace 
app.put("replace/:id", async (req,res) =>{
   try {
     let userID = req.params.id
    let newUser = req.body
    let ans = await userModel.findOneAndReplace({_id : userID}, newUser)
    res.status(200).json({
        "msg" : "user replaced successfully", ans
    }) 
   } catch (error) {
     console.log(error);
     res.status(500).json({
        "msg" : "internal server error"
     })
   }
})

// replace one 
app.put("/replace-one/:id", async (req,res) =>{
    try {
        let userID = req.params.id
        let newUser = req.body
        let ans = await userModel.replaceOne({_id : userID}, newUser)
        res.status(200).json({
            "msg" : "user replaced successfully", ans
        })
    } catch (error) {
          console.log(error);
     res.status(500).json({
        "msg" : "internal server error"
     })
    }
})

// update one ()
app.patch("/update-one/:id", async (req,res) =>{
   try {
     let userID = req.params.id
    let newUser = req.body.id
    let ans = await userModel.updateOne({_id : userID}, newUser)
     res.status(200).json({
            "msg" : "user updated successfully", ans
        })
   } catch (error) {
    console.log(error);
     res.status(500).json({
        "msg" : "internal server error"
     })
   }
})

// update many 
app.patch("/update-many/:id" , async (req,res) =>{
   try {
     let userID = req.params.id
    let newUser = req.body.id
    let ans = await userModel.updateMany({_id : userID}, newUser)
     res.status(200).json({
            "msg" : "user updated successfully", ans
        })
   } catch (error) {
    console.log(error);
     res.status(500).json({
        "msg" : "internal server error"
     })
   }
})

// delete one ()
app.delete("/delete-one/:id" , async (req,res) =>{
    try {
      let userID = req.params.id
      let ans = await userModel.deleteOne(userID)
      res.status(200).json({
        "msg" : "user deleted successfully", ans
      })  
    } catch (error) {
       console.log(error);
     res.status(500).json({
        "msg" : "internal server error"
     })  
    }
})

// delete many()
app.delete("/delete-many/:name" , async (req,res) =>{
    try {
       let name = req.params.name
       let ans = await userModel.deleteMany(name) 
       res.status(200).json({
        "msg" : "users deleted successdully", ans
       })
    } catch (error) {
        console.log(error);
     res.status(500).json({
        "msg" : "internal server error"
     })  
    }
})

app.use("/user", userRouter);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})