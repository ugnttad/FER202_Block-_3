import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cart-items");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart-items", JSON.stringify(items));
  }, [items]);

  const addItem = (dish) => setItems((prev) => [...prev, dish]);
  const removeItem = (id) => setItems((prev) => prev.filter((x) => x.id !== id));
  const clear = () => setItems([]);

  const total = useMemo(
    () => items.reduce((acc, it) => acc + parseFloat(it.price), 0),
    [items]
  );

  const value = useMemo(
    () => ({ items, addItem, removeItem, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
