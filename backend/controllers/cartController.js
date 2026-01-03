const Cart = require("../models/Cart");

/* ADD to cart */
exports.addToCart = async (req, res) => {
  try {
      
    const { userId, productId } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1 }]
      });
    } else {
      const item = cart.items.find(
        i => i.productId.toString() === productId
      );

      if (item) {
        item.quantity += 1;
      } else {
        cart.items.push({ productId, quantity: 1 });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to cart" });
  }
};

/* GET user cart */
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId })
      .populate("items.productId");
    res.json(cart);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch cart" });
  }
};

/* REMOVE item */
exports.removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    await cart.save();

    // ✅ CRITICAL: populate before sending response
    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to remove item" });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const { userId, productId, action } = req.body;

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (i) => i.productId.toString() === productId
    );

    // ✅ CRITICAL SAFETY CHECK
    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "inc") {
      item.quantity += 1;
    }

    if (action === "dec") {
      item.quantity = Math.max(1, item.quantity - 1);
    }

    await cart.save();

    // ✅ populate product details again
    const updatedCart = await Cart.findOne({ userId })
      .populate("items.productId");

    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update quantity" });
  }
};
