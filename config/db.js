import mongoose from "mongoose";
import colors from "colors";

mongoose.set('strictQuery', false);

// Global cached connection for serverless
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  // If we have a cached connection, return it
  if (cached.conn) {
    return cached.conn;
  }

  // If we don't have a promise yet, create one
  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      maxPoolSize: 10, // Maximum number of connections in the pool
      minPoolSize: 2,  // Minimum number of connections in the pool
      serverSelectionTimeoutMS: 30000, // Increased timeout for server selection (30s)
      socketTimeoutMS: 45000, // How long a socket can be inactive (45s)
      family: 4 // Use IPv4, skip trying IPv6
    };

    cached.promise = mongoose.connect(process.env.MONGO_URL, opts)
      .then((mongoose) => {
        console.log(
          `Connected To MongoDB Database ${mongoose.connection.host}`.bgMagenta.white
        );
        return mongoose;
      })
      .catch((error) => {
        console.error(`Error connecting to MongoDB: ${error}`.bgRed.white);
        // Clear the failed promise so we can try again
        cached.promise = null;
        throw error;
      });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
};

export default connectDB;
