// cartRoute.js

const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

router.get("/", async (req, res) => {
  // try {
  //   const cartData = await Cart.find();
  //   res.json(cartData);
  // } catch (err) {
  //   res.status(500).json({ message: err.message });
  // }
  try {
    const cartData = await Cart.find().populate("items.productId"); // Populate the product details for each item
    res.json(cartData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add product to cart
router.post("/add", async (req, res) => {
  const { productId } = req.body;

  try {
    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Check if the cart exists
    let cart = await Cart.findOne();
    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = new Cart({ items: [{ productId }] });
    } else {
      // Check if the product is already in the cart
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );
      if (existingItemIndex !== -1) {
        // If the product is already in the cart, update its quantity
        cart.items[existingItemIndex].quantity += 1;
      } else {
        // If the product is not in the cart, add it
        cart.items.push({ productId });
      }
    }

    // Save the cart
    await cart.save();
    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE route to remove a product from the cart
router.delete("/remove/:productId", async (req, res) => {
  const productId = req.params.productId;

  try {
    // Logic to remove the product from the cart
    const cart = await Cart.findOneAndUpdate(
      {},
      { $pull: { items: { productId } } },
      { new: true }
    );

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.json({ message: "Product removed from cart", cart });
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
});

module.exports = router;
