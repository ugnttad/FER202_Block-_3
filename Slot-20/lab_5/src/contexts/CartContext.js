import React, { createContext, useMemo, useReducer } from "react";
export const CartContext = createContext();

// ép mọi kiểu giá về số
const toNumber = (v) =>
  typeof v === "number" ? v : Number(String(v || "").replace(/[^\d]/g, "")) || 0;

// lấy đơn giá theo các field hay gặp
const getUnitPrice = (p) =>
  toNumber(
    p?.currentPrice ??
    p?.salePrice ??
    p?.price ??
    p?.newPrice ??
    p?.gia ??
    p?.giaKM ??
    0
  );

function reducer(state, action) {
  switch (action.type) {
    case "ADD": {
      const idx = state.items.findIndex((i) => i.id === action.item.id);
      if (idx >= 0) {
        const items = [...state.items];
        // nếu item cũ chưa có unitPrice thì bổ sung luôn
        const unitPrice = items[idx].unitPrice ?? getUnitPrice(items[idx]);
        items[idx] = {
          ...items[idx],
          unitPrice,
          quantity: (items[idx].quantity || 1) + (action.qty || 1),
        };
        return { items };
      }
      // gắn unitPrice chuẩn hoá khi thêm vào giỏ
      const unitPrice = getUnitPrice(action.item);
      return {
        items: [
          ...state.items,
          { ...action.item, unitPrice, quantity: action.qty || 1 },
        ],
      };
    }
    case "UPDATE_QTY":
      return {
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, quantity: action.qty } : i
        ),
      };
    case "REMOVE":
      return { items: state.items.filter((i) => i.id !== action.id) };
    case "CLEAR":
      return { items: [] };
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, { items: [] });

  const addToCart = (item, qty = 1) =>
    dispatch({ type: "ADD", item, qty });
  const updateQuantity = (id, qty) =>
    dispatch({
      type: "UPDATE_QTY",
      id,
      qty: Math.max(1, Number(qty || 1)),
    });
  const removeFromCart = (id) => dispatch({ type: "REMOVE", id });
  const clearCart = () => dispatch({ type: "CLEAR" });

  // tổng dựa trên unitPrice (fallback tự tính nếu thiếu)
  const total = useMemo(
    () =>
      state.items.reduce(
        (s, i) =>
          s + (i.unitPrice ?? getUnitPrice(i)) * (i.quantity || 1),
        0
      ),
    [state.items]
  );

  return (
    <CartContext.Provider
      value={{
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cart: state.items,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
