// server.js
import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";
import configRoutes from "./src/routes/configRoutes.js";
import submissionRoutes from "./src/routes/submissionRoutes.js";

dotenv.config();

const app = express();

// Core middleware
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(morgan("dev"));

// Health check
app.get("/api/health", (req, res) =>
  res.json({ status: "ok", uptime: process.uptime() })
);

// Mount routes
app.use("/api/config", configRoutes);
app.use("/api/submissions", submissionRoutes);

// Error handling (must be last)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 4000;

// Start server only after DB connection
connectDB()
  .then(() => {
    app.listen(PORT, () =>
      console.log(`🚀 Server running on http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
  });
