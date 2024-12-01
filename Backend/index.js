import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import UserRoute from "./Router/userRoute.js";
import PostRoute from "./Router/postRoute.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;

// CORS Configuration
const corsOptions = {
  origin: process.env.NODE_ENV === "production" ? "https://your-production-url.com" : "http://localhost:5173",
};
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api", [UserRoute, PostRoute]);

// Serve Frontend in Production
const __dirname = path.resolve(); // Fix _dirname
const distPath = path.join(__dirname, "Frontend", "dist");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// Connect to MongoDB and Start the Server
mongoose
  .connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit if there's an error with MongoDB connection
  });
