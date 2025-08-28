// src/config/db.js
import mongoose from "mongoose";

export async function connectDB() {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("❌ MONGO_URI not set in environment");

  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // you can also add authSource/dbName if needed
    });
    console.log("✅ MongoDB connected successfully");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    // Exit process if cannot connect
    process.exit(1);
  }

  // Handle connection events
  mongoose.connection.on("disconnected", () => {
    console.warn("⚠️ MongoDB disconnected");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("🔄 MongoDB reconnected");
  });
}
