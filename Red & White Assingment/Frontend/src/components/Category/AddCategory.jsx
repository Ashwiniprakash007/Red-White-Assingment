import React, {useState} from "react";
import Navbar from "../Navbar";
import { TextField, Button } from "@material-ui/core";
import { useNavigate } from "react-router-dom";

export const AddCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8080/categories/addCtegory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: categoryName }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add category");
      }
      setCategoryName("");
      alert("Category added successfully!");
      navigate("/category");
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category");
    }
  };
  return (
    <div>
      <Navbar />
      <h2>AddCategory</h2>
      <form onSubmit={handleSubmit}>
        <div >
        <TextField
          label="Category Name"
          variant="outlined"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          style={{ marginBottom: "10px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Category
        </Button>
        </div>
      </form>
    </div>
  );
};
