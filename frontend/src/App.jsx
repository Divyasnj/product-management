import { useEffect, useState } from "react";
import api from "./api/axios";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import AddProductPage from "./pages/AddProductPage";
import ProductCatalogPage from "./pages/ProductCatalogPage";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/cartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import ProtectedRoute from "./components/ProtectedRoute";
import { CartProvider } from "./context/cartContext";

function App() {
  const [products, setProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");

  const isLoggedIn = !!localStorage.getItem("token");

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (isLoggedIn) fetchProducts();
  }, [isLoggedIn]);

  const addProduct = async (product, id = null) => {
    try {
      if (id) {
        await api.put(`/products/${id}`, product);
      } else {
        await api.post("/products", product);
      }
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

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
    <CartProvider>
      <Router>
        <div className="bg-gray-100 min-h-screen">
          {/* ✅ Navbar only AFTER login */}
          {isLoggedIn && <Navbar />}

          <Routes>
            {/* 🔓 Public */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* 🔐 Protected */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/products"
              element={
                <ProtectedRoute>
                  <ProductCatalogPage
                    products={products}
                    deleteProduct={deleteProduct}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/add-product"
              element={
                <ProtectedRoute>
                  <AddProductPage addProduct={addProduct} />
                </ProtectedRoute>
              }
            />

            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
