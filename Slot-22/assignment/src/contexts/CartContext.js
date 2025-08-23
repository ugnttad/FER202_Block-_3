import React, { createContext, useEffect, useMemo, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try { return JSON.parse(localStorage.getItem("cart_items") || "[]"); } catch { return []; }
  });

  useEffect(() => {
    try { localStorage.setItem("cart_items", JSON.stringify(items)); } catch { }
  }, [items]);

  const addToCart = (product, qty = 1) => {
    setItems(prev => {
      const i = prev.findIndex(x => x.id === product.id);
      const unit = Number(product.salePrice ?? product.price) || 0;
      if (i > -1) {
        const cp = [...prev];
        cp[i] = { ...cp[i], qty: cp[i].qty + qty };
        return cp;
      }
      return [...prev, { id: product.id, title: product.title, price: unit, qty, image: product.image }];
    });
  };

  const removeFromCart = (id) => setItems(prev => prev.filter(x => x.id !== id));
  const clearCart = () => setItems([]);
  const incQty = (id) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty: x.qty + 1 } : x));
  const decQty = (id) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, x.qty - 1) } : x));
  const updateQuantity = (id, q) => setItems(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, Number(q) || 1) } : x));

  const count = useMemo(() => items.reduce((s, x) => s + x.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, x) => s + x.price * x.qty, 0), [items]);

  const value = useMemo(() => ({
    cart: items, addToCart, removeFromCart, clearCart, incQty, decQty, updateQuantity,
    count, subtotal, total: subtotal
  }), [items, subtotal, count]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
