import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import Button from "@material-ui/core/Button";

const Product = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const getProducts = async () => {
    await fetch(`http://localhost:8080/products`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())

      .then((res) => {
        setData([...res]);
        console.log("res===>", res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleAddProductClick = () => {
    navigate("/addproducts");
  };

  return (
    <div>
      <Navbar />
      <h2>Products</h2>
      <Button variant="contained" color="primary" onClick={handleAddProductClick}>Add Product</Button>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "auto auto auto auto",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default Product;
