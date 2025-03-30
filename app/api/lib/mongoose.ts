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
    // Clean and normalize the MongoDB URI
    // This helps with potential encoding issues in environment variables
    let cleanURI = MONGODB_URI;

    // Handle URL-encoded characters in the connection string
    // This is especially important for passwords with special characters
    if (MONGODB_URI.includes("%")) {
      try {
        // Extract parts of the URI to handle them separately
        const [protocol, rest] = MONGODB_URI.split("://");
        const [credentials, hostAndPath] = rest.split("@");

        if (credentials && credentials.includes(":")) {
          // Decode username and password if they're URL encoded
          const [username, password] = credentials.split(":");
          const decodedUsername = decodeURIComponent(username);
          const decodedPassword = decodeURIComponent(password);

          // Rebuild the connection string with decoded parts
          cleanURI = `${protocol}://${decodedUsername}:${decodedPassword}@${hostAndPath}`;
          console.log(
            "Connection string was URL-encoded, and has been normalized"
          );
        }
      } catch (parseError) {
        console.warn("Failed to parse MongoDB URI, using as-is:", parseError);
      }
    }

    // Log the connection attempt (without exposing the full connection string)
    const maskedURI = cleanURI.replace(
      /(mongodb(\+srv)?:\/\/)[^:]+:[^@]+@/,
      "$1****:****@"
    );
    console.log(`Connecting to MongoDB: ${maskedURI}`);

    // Configure connection options
    const options = {
      serverSelectionTimeoutMS: 30000, // Increased timeout to 30s
      connectTimeoutMS: 30000, // Increased timeout to 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    };

    await mongoose.connect(cleanURI, options);
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
      } else if (error.name === "MongoParseError") {
        console.error(
          "Parse error - check your MongoDB connection string format"
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
