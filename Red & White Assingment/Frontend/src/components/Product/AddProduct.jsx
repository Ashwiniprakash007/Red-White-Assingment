import React, { useState } from "react";
import Navbar from "../Navbar";
import {
  TextField,
  Button,
  Typography,
  Container,
  Grid,
  Select,
  MenuItem,
} from "@mui/material";
import  { useNavigate }  from 'react-router-dom';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    category: "",
    title: "",
    description: "",
    price: "",
    oldPrice: "",
    rating: "",
    inStock: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();
    // await fetch(`http://localhost:8080/products/addproduct`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // })
    // if (!response.ok) {
    //   throw new Error("Failed to add category");
    // }
    // setFormData("");
    // alert("Product added successfully!");
    // navigate("/");
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/products/addproduct`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      setFormData("");
      alert("Product added successfully!");
      navigate("/");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add Product");
    }
  };
  return (
    <div>
      <Navbar />
      <Container maxWidth="sm">
        <Typography variant="h4" gutterBottom>
          Add Product
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <TextField
              fullWidth
              variant="outlined"
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleChange}
            />

            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Old Price"
                name="oldPrice"
                value={formData.oldPrice}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="Rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                variant="outlined"
                type="number"
                label="In Stock"
                name="inStock"
                value={formData.inStock}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                variant="outlined"
                label="Image URL"
                name="image"
                value={formData.image}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </div>
  );
};
export default AddProduct;
