import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import SessionRoutes from "./routes/SessionRoutes.js";

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGO_URI;

// ----------- MIDDLEWARE ------------
app.use(
  cors({
    origin: process.env.CLIENT_URL,   // http://localhost:3000
    credentials: true,                // allow cookies & headers
  })
);

app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));   // For parsing JSON
app.use(express.urlencoded({ extended: true })); // Better than body-parser
app.use(express.static("public")); // For uploaded images

// ----------- DATABASE CONNECTION ------------
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("DB Error:", err));

// ----------- ROUTES ------------
app.use("/users", userRoutes);
app.use("/sessions", SessionRoutes);

// ----------- START SERVER ------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
