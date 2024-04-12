import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Product from "./components/Product/Product";
import AddProduct from "./components/Product/AddProduct";
import { Cart } from "./components/Cart/Cart";
import { Cateogry } from "./components/Category/Cateogry";
import { AddCategory } from "./components/Category/AddCategory";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/nav" element={<Navbar />} />
          <Route path="/" element={<Product />} />
          <Route path="/addproducts" element={<AddProduct/>} />
          <Route path="/cart" element={<Cart/>} />
          <Route path="/category" element={<Cateogry/>} />
          <Route path="/Addcategory" element={<AddCategory/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
