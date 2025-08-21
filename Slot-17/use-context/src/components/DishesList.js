import React, { useMemo } from "react";
import { useCart } from "../context/CartContext";

function Stars({ value = 4 }) {
  const full = "★".repeat(Math.round(value));
  const empty = "☆".repeat(5 - Math.round(value));
  return <span aria-label={`${value} stars`} className="text-warning">{full}{empty}</span>;
}

export default function DishesList({ dishes, query }) {
  const { addItem } = useCart();
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return dishes;
    return dishes.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        (d.description || "").toLowerCase().includes(q) ||
        (d.category || "").toLowerCase().includes(q)
    );
  }, [dishes, query]);

  return (
    <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
      {filtered.map((dish) => (
        <div className="col" key={dish.id}>
          <div className="card h-100 product-card">
            <img className="card-img-top" src={dish.image} alt={dish.name} />
            <div className="card-body d-flex flex-column">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="badge bg-secondary badge-category">{dish.category}</span>
                <span className="price-tag">${parseFloat(dish.price).toFixed(2)}</span>
              </div>
              <h5 className="card-title mb-1">{dish.name}</h5>
              <div className="mb-2"><Stars value={dish.rating || 4} /></div>
              <p className="card-text text-secondary flex-grow-1">{dish.description}</p>
              <button className="btn btn-primary mt-auto" onClick={() => addItem(dish)}>
                ➕ Add to Cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
