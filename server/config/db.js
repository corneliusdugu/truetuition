// server/config/db.js
const mongoose = require("mongoose");

async function connectDB() {
  const isTest = process.env.NODE_ENV === "test";
  const mongoUri = isTest ? process.env.MONGO_URI_TEST : process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "Missing MongoDB connection string in env (MONGO_URI / MONGO_URI_TEST)"
    );
  }

  // Avoid re-connecting in watch/reload situations
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected");
    return;
  }

  const isAtlas = mongoUri.startsWith("mongodb+srv://") || mongoUri.includes("mongodb.net");

  const options = {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    socketTimeoutMS: 45000,
  };

  // ✅ Only force TLS for Atlas. Local MongoDB should NOT use TLS by default.
  if (isAtlas) {
    options.tls = true;
    options.tlsAllowInvalidCertificates = false;
    options.tlsAllowInvalidHostnames = false;
  }

  try {
    await mongoose.connect(mongoUri, options);
    console.log(`MongoDB connected (${isAtlas ? "Atlas" : "Local"})`);
  } catch (err) {
    console.error("MongoDB connection error:", err?.message || err);
    throw err;
  }
}

module.exports = connectDB;
