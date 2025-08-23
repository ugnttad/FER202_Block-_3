// src/pages/AppNavBar.js
import React, { useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";
import { FavouritesContext } from "../contexts/FavouritesContext";
import { AuthContext } from "../contexts/AuthContext";

export default function AppNavBar() {
    const navigate = useNavigate();
    const { theme, toggle } = useContext(ThemeContext);
    const { cart = [] } = useContext(CartContext);
    const { favs = [] } = useContext(FavouritesContext);
    const { user, logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout?.();
        navigate("/products");
    };

    return (
        <nav
            className="navbar navbar-expand-lg shadow-sm px-3 mb-4"
            data-bs-theme={theme || "light"}
            style={{ background: "var(--surface)" }}
        >
            <div className="container-fluid">
                {/* Brand */}
                <Link className="navbar-brand site-title" to="/products">
                    RICHIE RESTAURANT
                </Link>

                {/* Right side */}
                <div className="d-flex order-lg-2 align-items-center gap-2">
                    {/* Theme toggle */}
                    <button className="btn btn-sm btn-outline-secondary" onClick={toggle}>
                        <i className={`bi ${theme === "dark" ? "bi-moon" : "bi-brightness-high"}`} />
                        <span className="ms-1 d-none d-sm-inline">{theme === "dark" ? "Dark" : "Light"}</span>
                    </button>

                    {/* Favourites */}
                    <button className="btn position-relative" onClick={() => navigate("/favourites")} title="My Favourites">
                        <i className="bi bi-heart fs-5" />
                        {favs.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {favs.length}
                            </span>
                        )}
                    </button>

                    {/* Cart */}
                    <button className="btn position-relative" onClick={() => navigate("/cart")} title="Cart">
                        <i className="bi bi-cart3 fs-5" />
                        {cart.length > 0 && (
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success">
                                {cart.length}
                            </span>
                        )}
                    </button>

                    {/* Account dropdown (Admin) */}
                    <div className="dropdown">
                        <button className="btn dropdown-toggle" data-bs-toggle="dropdown">
                            <i className="bi bi-person-circle fs-5" />
                            <span className="ms-2 d-none d-sm-inline">{user?.displayName || "Account"}</span>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                            {user ? (
                                <>
                                    <li><NavLink className="dropdown-item" to="/profile">Profile</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/favourites">My Favourites</NavLink></li>
                                    <li><hr className="dropdown-divider" /></li>
                                    <li><button className="dropdown-item" onClick={handleLogout}>Logout</button></li>
                                </>
                            ) : (
                                <>
                                    <li><NavLink className="dropdown-item" to="/login">Login</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/register">Register account</NavLink></li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Left links */}
                <div className="collapse navbar-collapse justify-content-start order-lg-1">
                    <ul className="navbar-nav gap-2">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/products">HOME</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/register">REGISTER ACCOUNT</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
