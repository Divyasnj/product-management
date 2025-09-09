const Product = require("../models/Product");

// GET all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ price: 1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
};

// POST add new product
exports.addProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      imageUrl: req.file?.path || null, // Cloudinary gives image URL in req.file.path
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to add product" });
  }
};

// DELETE product
exports.deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete product" });
  }
};

// PUT update product
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, description, category } = req.body;

    const updateData = { name, price, description, category };

    // If new image uploaded, update Cloudinary URL
    if (req.file?.path) {
      updateData.imageUrl = req.file.path;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.json(updatedProduct);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: "Failed to update product" });
  }
};
