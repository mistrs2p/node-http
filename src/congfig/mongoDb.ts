import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
// Replace with your MongoDB URI
// const uri ="mongodb+srv://mahdimousavi40:mahdiMahdi40@node-http.xjudd.mongodb.net/?retryWrites=true&w=majority&appName=node-http";
const uri =process.env.MONGO_URI as string;

// Define an async function to connect using Mongoose
async function run() {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000, // Optional: Timeout after 5s instead of 30s
    });

    console.log("Connected to MongoDB with Mongoose!");

    // Your further database operations can go here
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1)
  } 
}

// Run the function
// run().catch(console.error);

export default run;
