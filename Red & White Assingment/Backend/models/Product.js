const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: "Category",
  // },
  category: String,
  title: String,
  description: String,
  price: Number,
  oldPrice: Number,
  rating: Number, // Assuming you will handle the stars on the front end
  inStock: Number,
  image: String, // File path or URL to the image
});

module.exports = mongoose.model("Product", productSchema);
