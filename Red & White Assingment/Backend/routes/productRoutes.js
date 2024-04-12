const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a product
router.post("/addproduct", async (req, res) => {
  const product = new Product({
    category: req.body.category,
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    oldPrice: req.body.oldPrice,
    rating: req.body.rating,
    inStock: req.body.inStock,
    image: req.body.image,
  });
  //const newProduct = await product.save();
  try {
    const newProduct = await product.save();
    res.status(201).json(newProduct); // Send HTTP status code 201
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/:categoryName", async (req, res) => {
  const { categoryName } = req.params;
  try {
    const products = await Product.find({
      category: categoryName,
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
