const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// CRUD routes
router.get("/", productController.getProducts);
router.post("/", productController.addProduct);
router.delete("/:id", productController.deleteProduct);
router.put("/:id", productController.updateProduct);

module.exports = router;
