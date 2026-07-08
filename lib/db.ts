import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

const ConnectDB = async () => {
  const connectionState = mongoose.connection.readyState;

  // If already connected or connecting, don't start a new request
  if (connectionState === 1) {
    console.log("Already connected to MongoDB.");
    return;
  }

  if (connectionState === 2) {
    console.log("Connection is currently in progress...");
    return;
  }

  try {
    // Add await here so the try/catch actually works
    await mongoose.connect(MONGODB_URI, {
      dbName: "your_database_name", // Optional: specify your DB name
      bufferCommands: false, // Recommended for serverless environments
    });

    console.log("Connected to MongoDB successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    // It's better to throw the actual error so you can debug the cause
    throw error;
  }
};

export default ConnectDB;
