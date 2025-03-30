import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

// Skip MongoDB connection during build time or if no URI is provided
const isProduction = process.env.NODE_ENV === "production";
const isVercelDeploy = process.env.VERCEL === "1";

if (!MONGODB_URI && isProduction && !isVercelDeploy) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Cache the mongoose connection
let isConnected = false;

async function dbConnect() {
  // Already connected
  if (isConnected) {
    return;
  }

  // Skip MongoDB connection if no URI is provided
  if (!MONGODB_URI) {
    console.warn("No MongoDB URI provided - skipping connection");
    return;
  }

  // Prevent multiple connections in development mode
  if (mongoose.connections[0].readyState) {
    isConnected = true;
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}

export default dbConnect;
