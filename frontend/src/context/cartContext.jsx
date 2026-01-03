import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // ✅ ALWAYS read userId dynamically
  const getUserId = () => localStorage.getItem("userId");

  const getCart = async () => {
    const userId = getUserId();
    if (!userId) return;

    const res = await api.get(`/cart/${userId}`);
    setCart(res.data?.items || []);
  };

  const addToCart = async (productId) => {
    const userId = getUserId();
    if (!userId) {
      alert("Please login again");
      return;
    }

    const res = await api.post("/cart/add", {
      userId,
      productId,
    });

    setCart(res.data.items);
  };

  const removeFromCart = async (productId) => {
    const userId = getUserId();
    if (!userId) return;

    const res = await api.delete(`/cart/${userId}/${productId}`);
    setCart(res.data.items);
  };

  const updateQuantity = async (productId, action) => {
    const userId = getUserId();
    if (!userId) return;

    const res = await api.put("/cart/update", {
      userId,
      productId,
      action,
    });

    setCart(res.data.items);
  };

  // ✅ 🔥 MOST IMPORTANT LINE
  // Load cart immediately when app starts
  useEffect(() => {
    getCart();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        getCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
