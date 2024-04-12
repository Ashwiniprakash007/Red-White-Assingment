import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@mui/material";

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const response = await fetch(`http://localhost:8080/cart/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: product._id }),
      });

      if (response.ok) {
        alert("Product added to cart successfully");
      } else {
        const errorMessage = await response.text();
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
      alert("Failed to add product to cart");
    }
  };
  return (
    <Card>
      <CardMedia
        component="img"
        height="250"
        width="250"
        image={product.image}
        alt={product.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.category}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.description}
        </Typography>
        <Typography variant="h6">Price: ${product.price}</Typography>
        {product.oldPrice && (
          <Typography variant="body2" color="text.secondary">
            Old Price: ${product.oldPrice}
          </Typography>
        )}
        <Typography variant="body2" color="text.secondary">
          In Stock: {product.inStock}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {product.rating}
        </Typography>

        <Button onClick={handleAddToCart} variant="contained" color="primary">
          Add To Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
