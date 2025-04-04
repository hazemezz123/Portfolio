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
    throw new Error("MongoDB URI is not defined");
  }

  // Prevent multiple connections in development mode
  if (mongoose.connections[0].readyState) {
    isConnected = true;
    return;
  }

  try {
    // Connection options optimized for serverless environments
    const opts: mongoose.ConnectOptions = {
      serverSelectionTimeoutMS: 5000, // Timeout for server selection
      socketTimeoutMS: 10000, // Timeout for operations
      connectTimeoutMS: 5000, // Timeout for initial connection
      maxPoolSize: 10, // Maximum number of connections in pool
      minPoolSize: 1, // Minimum number of connections in pool
      maxIdleTimeMS: 60000, // Maximum time a connection can be idle before being closed
      compressors: "zlib", // Compress data sent between the driver and MongoDB
      retryWrites: true, // Retry write operations when they fail
    };

    await mongoose.connect(MONGODB_URI, opts);
    isConnected = true;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw new Error("Could not connect to MongoDB");
  }
}

export default dbConnect;
