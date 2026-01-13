import mongoose from "mongoose";

const connectDB = async () => {
  try {
    // If we are already connected, don't connect again
    if (mongoose.connections[0].readyState) {
      return;
    }

    // Connect to MongoDB using the URI from your .env.local file
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
    
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // If connection fails, we want to know why
    throw new Error("Error connecting to database");
  }
};

export default connectDB;