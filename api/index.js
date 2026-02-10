const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || "*",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Connect database
require("../../backend/config/database").connect();

// Routes
const authRoutes = require("../../backend/routes/authRoutes");
const chatRoutes = require("../../backend/routes/chatRoutes");

app.use("/v1", authRoutes);
app.use("/v1", chatRoutes);

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API is running" });
});

// Export for Vercel
module.exports = app;
