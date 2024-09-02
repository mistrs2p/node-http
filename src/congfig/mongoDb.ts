import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const uri =process.env.MONGO_URI as string;

async function run() {
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log("Connected to MongoDB with Mongoose!");

  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1)
  } 
}

// run().catch(console.error);

export default run;
