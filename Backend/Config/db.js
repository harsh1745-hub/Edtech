import mongoose from "mongoose";

// Load environment variables
import dotenv from "dotenv";
dotenv.config();

// MongoDB connection URI
const MONGO_URL = process.env.MONGO_URL;

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    // Connect to MongoDB using Mongoose
    const conn = await mongoose.connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1); // Exit the process with a failure code
  }
};

// Export the connectDB function
export default connectDB;