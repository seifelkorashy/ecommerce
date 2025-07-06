import { useContext, createContext, useState, useEffect } from "react";

const cartContext = createContext();

import React from "react";

export default function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem("cartItems");
    return storedCart ? JSON.parse(storedCart) : [];
  });



  const addToCart = (pro) => {
    setCartItems(() => [...cartItems, { ...pro, quantity: 1 }]);
  };

  function increaseQuantity(id) {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  }

  function decreaseQuantity(id) {
    setCartItems(
      cartItems.map((item) => {

        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  }

  const removeFromCart = (productId) => {
    setCartItems(() => cartItems.filter((item) => item.id !== productId));
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);
  return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        setCartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export const useCart = () => useContext(cartContext);
