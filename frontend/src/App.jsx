import { useEffect, useState } from "react";
import api from "./api/axios";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddProductPage from "./pages/AddProductPage";
import ProductCatalogPage from "./pages/ProductCatalogPage";

function App() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc"); // ← added
  const [searchTerm, setSearchTerm] = useState("");   // ← added

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Add or Update Product
  const addProduct = async (product, id = null) => {
    try {
      if (id) {
        // Update product
        await api.put(`/products/${id}`, product);
      } else {
        // Add new product
        await api.post("/products", product);
      }
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  // Delete product
  const deleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await api.delete(`/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <Router>
      <div className="bg-gray-100 min-h-screen">
        <Navbar />
        <Routes>
          <Route
            path="/add-product"
            element={<AddProductPage addProduct={addProduct} />}
          />
          <Route
            path="/products"
            element={
              <ProductCatalogPage
                products={products}
                deleteProduct={deleteProduct}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}      // ← added
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}    // ← added
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
