const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  category: { type: String },
  imageUrl: { type: String }, // Cloudinary image URL
}, { timestamps: true }); // optional, adds createdAt & updatedAt

module.exports = mongoose.model("Product", productSchema);
