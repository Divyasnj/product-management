const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// add product to cart
router.post("/add", cartController.addToCart);

// get cart by user
router.get("/:userId", cartController.getCart);

// remove product from cart
router.delete("/:userId/:productId", cartController.removeFromCart);

// update quantity (optional but recommended)
router.put("/update", cartController.updateQuantity);

module.exports = router;

