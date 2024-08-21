import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// console.log(process.env)


// Connect to MongoDB

async function connectToDB(){
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
    }
}

export default connectToDB;