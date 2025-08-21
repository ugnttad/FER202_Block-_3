import React from "react";
import { useCart } from "../context/CartContext";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const { items } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-body border-bottom sticky-top">
      <div className="container app-container">
        <a className="navbar-brand fw-bold" href="#home" aria-label="Home">
          <span role="img" aria-label="bowl">🍲</span> Food Court
        </a>

        <button className="navbar-toggler" type="button"
          data-bs-toggle="collapse" data-bs-target="#navbarMain"
          aria-controls="navbarMain" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarMain">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item"><a className="nav-link" href="#home">Home</a></li>
            <li className="nav-item"><a className="nav-link" href="#menu">Menu</a></li>
            <li className="nav-item">
              <a className="nav-link" href="#cart">Cart <span className="badge bg-primary">{items.length}</span></a>
            </li>
          </ul>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
