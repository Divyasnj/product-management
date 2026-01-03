const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db");
const authRoutes=require("./routes/authRoutes")
const productRoutes = require("./routes/productRoutes");
const cartRoutes=require("./routes/cartRoutes")


const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,
  })
);
app.use(express.json());
app.use("/api/auth",authRoutes);

// Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
