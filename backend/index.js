const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const productRoutes = require("./routes/productRoutes");

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
  })
);
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
