import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./config/db.js";
import { runAutoSeed } from "./utils/autoSeed.js";
import authRoutes from "./routes/authRoutes.js";
import landingRoutes from "./routes/landingRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";

import { errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

// ES module __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Connect to database and run auto-seed
const startServer = async () => {
  try {
    // Connect to database
    await connectDB();

    // Run auto-seed if enabled (seeds database on first startup)
    await runAutoSeed();

    // Middleware
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Serve static files from uploads folder (kept for backward compatibility)
    app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/landing", landingRoutes);
    app.use("/api/appointments", appointmentRoutes);
    app.use("/api/doctors", doctorRoutes);

    // Health check
    app.get("/api/health", (req, res) => {
      res.json({ success: true, message: "Server is running" });
    });

    // Error handler
    app.use(errorHandler);

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV || "development"
        } mode on port ${PORT}`
      );
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
