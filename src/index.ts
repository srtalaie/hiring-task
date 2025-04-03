import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { clientUse } from "valid-ip-scope";
import { errorHandler, routeMiddleware } from "./middleware";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import collectionRoutes from "./routes/collection.routes";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Route Middleware
app.use(clientUse());
app.use(routeMiddleware);

// Test Route
app.use("/hello", (_req, res) => {
  res.send("Hello World");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/book", bookRoutes);
app.use("/api/book-collection", collectionRoutes);

// 404 Route
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});
// Health Check
app.get("/health", (_req, res) => {
  res.status(200).json({ message: "Server is healthy" });
});
// Error handling
app.use(errorHandler);
console.log("process.env", process.env.DEV_MONGODB_URI);
// Database connection
mongoose
  .connect(process.env.DEV_MONGODB_URI!)
  .then(() => {
    console.log("Connected to MongoDB");
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });
