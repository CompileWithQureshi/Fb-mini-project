import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./Router/userRoute.js";
import PostRoute from "./Router/postRoute.js";
import cros from 'cors'

dotenv.config(); // Correct way to import dotenv in ES Modules

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URL = process.env.MONGO_URL;
var corsOptions = {
  origin: "http://localhost:5173"
};
app.use(cros(corsOptions))

// Middleware
app.use(express.json());

// Routes
app.use("/api", [UserRoute, PostRoute]);




// MongoDB Connection
mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("Connected to DB");

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error);
  });
