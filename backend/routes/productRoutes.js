const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const { upload } = require("../middleware/cloudinary"); // ⬅️ import Cloudinary multer

// CRUD routes
router.get("/", productController.getProducts);

// add product with image upload
router.post("/", upload.single("image"), productController.addProduct);

// delete product
router.delete("/:id", productController.deleteProduct);

// update product with optional new image
router.put("/:id", upload.single("image"), productController.updateProduct);

module.exports = router;
