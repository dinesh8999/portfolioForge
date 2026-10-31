import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import portfolioRoutes from "./routes/portfolios.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env relative to server file, with cwd fallback
dotenv.config({ path: path.resolve(__dirname, "../.env") });
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:5173",
  process.env.PUBLIC_APP_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl, or Postman)
      if (!origin) return callback(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^https:\/\/.*\.vercel\.app$/.test(origin) ||
        /^https:\/\/.*\.onrender\.com$/.test(origin) ||
        /^http:\/\/localhost:[0-9]{4,5}$/.test(origin) ||
        /^http:\/\/127\.0\.0\.1:[0-9]{4,5}$/.test(origin)
      ) {
        return callback(null, true);
      }
      return callback(null, true); // Permissive in dev, or origin check
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// High limits for large high-resolution images encoded in Base64 (no artificial size limit)
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Root status endpoint
app.get("/", (_req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    name: "PortfolioForge API",
    status: isConnected ? "ok" : "degraded",
    message: "PortfolioForge API is running!",
    database: isConnected ? "connected" : "disconnected",
    health: "/api/health",
  });
});

// Health endpoint
app.get("/api/health", (_req, res) => {
  const isConnected = mongoose.connection.readyState === 1;
  res.json({
    status: isConnected ? "ok" : "degraded",
    message: "PortfolioForge API is running!",
    database: isConnected ? "connected" : "disconnected",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});
    database: isConnected ? "connected" : "disconnected",
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
  });
});

// Routes
app.use("/api/portfolios", portfolioRoutes);

// 404 handler for unmatched API routes
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API endpoint not found." });
  }
  next();
});

// Centralized error handler
app.use((err, _req, res, _next) => {
  console.error("Internal Server Error:", err);
  const status = err.status || 500;
  const message =
    process.env.NODE_ENV === "production"
      ? "An unexpected error occurred."
      : err.message || "An unexpected error occurred.";
  res.status(status).json({ error: message });
});

async function startServer() {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("⚠️ MONGO_URI is missing from .env");
    } else {
      await mongoose.connect(process.env.MONGO_URI, {
        serverSelectionTimeoutMS: 5000,
      });
      console.log("MongoDB Atlas connected successfully!");
    }

    const server = app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT}`);
    });

    const shutdown = async () => {
      console.log("Shutting down backend gracefully...");
      server.close(async () => {
        if (mongoose.connection.readyState === 1) {
          await mongoose.connection.close();
        }
        process.exit(0);
      });
    };

    process.on("SIGINT", shutdown);
    process.on("SIGTERM", shutdown);
  } catch (error) {
    console.error("Backend startup failed:", error.message);
    // Don't exit immediately in case port binding retry or offline development
    app.listen(PORT, "0.0.0.0", () => {
      console.log(`Backend running on port ${PORT} (offline DB mode)`);
    });
  }
}

startServer();
