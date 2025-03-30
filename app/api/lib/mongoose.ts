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
  if (mongoose.connections[0]?.readyState === 1) {
    isConnected = true;
    return;
  }

  try {
    // Log the connection attempt (without exposing the full connection string)
    const maskedURI = MONGODB_URI.replace(
      /(mongodb(\+srv)?:\/\/)[^:]+:[^@]+@/,
      "$1****:****@"
    );
    console.log(`Connecting to MongoDB: ${maskedURI}`);

    // Configure connection options
    const options = {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      connectTimeoutMS: 10000, // Give up initial connection after 10s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    await mongoose.connect(MONGODB_URI, options);
    isConnected = true;
    console.log("MongoDB connected successfully");
  } catch (error) {
    isConnected = false;
    console.error("MongoDB connection error:", error);

    // More detailed error logging
    if (error instanceof Error) {
      console.error(`Error name: ${error.name}`);
      console.error(`Error message: ${error.message}`);
      console.error(`Error stack: ${error.stack}`);

      // Log specific MongoDB errors
      if (error.name === "MongoNetworkError") {
        console.error(
          "Network error - check your connection and MongoDB Atlas network access settings"
        );
      } else if (error.name === "MongoServerSelectionError") {
        console.error(
          "Server selection error - check if your MongoDB cluster is running"
        );
      }
    }

    // Rethrow to let API routes handle the error
    throw new Error(
      `Failed to connect to MongoDB: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export default dbConnect;
