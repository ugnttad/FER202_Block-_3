import React from "react";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, clear, total } = useCart();

  return (
    <div id="cart" className="sticky-card">
      <div className="card">
        <div className="card-header fw-bold">🛒 Your Cart</div>
        <div className="card-body">
          {!items.length ? (
            <div className="alert alert-secondary m-0">Your cart is empty.</div>
          ) : (
            <>
              <ol className="list-group list-group-numbered mb-3">
                {items.map((it) => (
                  <li key={it.id} className="list-group-item d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold">{it.name}</div>
                      <div className="text-secondary small">${parseFloat(it.price).toFixed(2)}</div>
                    </div>
                    <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(it.id)} type="button">
                      Remove
                    </button>
                  </li>
                ))}
              </ol>

              <div className="d-flex align-items-center gap-3">
                <div className="ms-auto fw-semibold">Total: ${total.toFixed(2)}</div>
              </div>
              <div className="d-flex align-items-center gap-2 mt-3">
                <button className="btn btn-outline-secondary" onClick={clear} type="button">Clear</button>
                {/* CHỈ mở modal bằng data-bs-target, không render modal ở đây */}
                <button className="btn btn-success ms-auto" data-bs-toggle="modal" data-bs-target="#checkoutModal" type="button">
                  Confirm &amp; Pay
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
