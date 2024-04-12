import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Button from "@material-ui/core/Button";
import { Card, CardContent, CardMedia, Typography } from "@material-ui/core";
import  { useNavigate }  from 'react-router-dom';

export const Cateogry = ({product}) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`http://localhost:8080/categories`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = async (categoryName) => {
    try {
      const response = await fetch(
        `http://localhost:8080/products/${categoryName}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setProducts(data);
      setSelectedCategory(categoryName);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setSelectedCategory(categoryName);
  };


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

  const handleAddCategoryClick = () => {
    navigate('/Addcategory');
  };

  return (
    <div>
      <Navbar />
      <h2>Cateogry</h2>
      <div style={{display:"flex", justifyContent:"space-around"}}>
      <div>
        {categories.map((category) => (
          <Button
            key={category._id}
            variant="contained"
            color={selectedCategory === category.name ? "primary" : "default"}
            onClick={() => handleCategoryClick(category.name)}
          >
            {category.name}
          </Button>
        ))}
      </div>
      <div>
        <Button onClick={handleAddCategoryClick} variant="contained" color="primary">Add Category</Button>
      </div>
      </div>

      {/* <h2>Products</h2> */}
      <div
      style={{ display: "grid" , 
      gridTemplateColumns:"auto auto auto auto",
       gap:"20px",
       marginTop:"20px"
       }}>
        {products.map((product) => (
          <Card key={product._id} style={{ marginBottom: "20px" }}>
            <CardMedia
              component="img"
              height="250"
              width="250"
              image={product.image}
              alt={product.title}
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {product.title}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                {product.category}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Description: {product.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Price: {product.price}
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
        ))}
      </div>
    </div>
  );
};
