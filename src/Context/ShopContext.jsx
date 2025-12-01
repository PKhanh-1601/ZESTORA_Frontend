import React, { createContext, useEffect, useState } from "react";
import all_product from "../Components/Assets/all_product.js";
import cartApi from "../api/cartApi";

export const ShopContext = createContext(null);

const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const token = sessionStorage.getItem("token");

  const fetchCartFromBackend = async () => {
    if (!token) return;
    try {
      const res = await cartApi.getMyCart();
      const items = res.data.data.items;
      const newCart = {};
      items.forEach((item) => {
        newCart[item.productId._id || item.productId] = item.quantity;
      });
      setCartItems(newCart);
    } catch (err) {
      console.log("Cart empty or user not logged in");
    }
  };

  const addToCart = async (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    if (!token) return;

    try {
      await cartApi.addToCart(productId);
    } catch (err) {
      console.log("Add error:", err);
      // rollback using functional update
      setCartItems((prev) => ({
        ...prev,
        [productId]: Math.max((prev[productId] || 1) - 1, 0),
      }));
    }
  };

  const updateCartItem = async (productId, quantity) => {
    quantity = Math.max(1, quantity); // clamp >= 1

    // update UI immediately
    setCartItems((prev) => ({
      ...prev,
      [productId]: quantity,
    }));

    if (!token) return;

    try {
      await cartApi.updateCart(productId, quantity);
    } catch (err) {
      console.log("Update error:", err);
      // rollback using functional update
      setCartItems((prev) => ({
        ...prev,
        [productId]: prev[productId], // giữ nguyên số mới nhất
      }));
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: 0,
    }));
    if (!token) return;

    try {
      await cartApi.removeFromCart(productId);
    } catch (err) {
      console.log("Remove error:", err);
      setCartItems((prev) => ({
        ...prev,
        [productId]: prev[productId], // rollback đúng
      }));
    }
  };

  useEffect(() => {
    fetchCartFromBackend();
  }, [token]);

  const getTotalCartAmount = () => {
    return Object.entries(cartItems).reduce((acc, [id, qty]) => {
      const info = all_product.find((p) => p.id === Number(id));
      return acc + (info ? info.new_price * qty : 0);
    }, 0);
  };

  const getTotalCartItems = () =>
    Object.values(cartItems).reduce((a, b) => a + b, 0);

  return (
    <ShopContext.Provider
      value={{
        cartItems,
        all_product,
        addToCart,
        updateCartItem,
        removeFromCart,
        getTotalCartAmount,
        getTotalCartItems,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
