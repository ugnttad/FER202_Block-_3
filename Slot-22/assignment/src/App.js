import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";

import ProductList from "./components/Products/ProductList";
import ProductDetail from "./components/Products/ProductDetail";
import Wishlist from "./components/Wishlist/Wishlist";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Account from "./components/Auth/Account";

import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { CartProvider, CartContext } from "./contexts/CartContext";
import { WishlistProvider, WishlistContext } from "./contexts/WishlistContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { Dropdown } from "react-bootstrap";

function Header() {
  const { user, logout } = useContext(AuthContext) || {};
  const { count } = useContext(CartContext) || { count: 0 };
  const { count: wishCount, clear: clearWishlist } =
    useContext(WishlistContext) || { count: 0, clear: () => { } };
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearWishlist(); // reset badge wishlist khi sign out
    navigate("/", { replace: true });
  };

  const displayName = user?.name || user?.username || user?.email || "Account";

  return (
    <nav className="navbar navbar-expand-lg shadow-sm px-4" style={{ background: "#f6f3ee" }}>
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Richie Electronics</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navMain" className="collapse navbar-collapse justify-content-end">
          <ul className="navbar-nav gap-3 align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>

            <li className="nav-item">
              <Link className="nav-link" to="/wishlist">
                Wishlist <span className="badge text-bg-secondary">{user ? wishCount : 0}</span>
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                Cart <span className="badge text-bg-success">{count}</span>
              </Link>
            </li>

            {/* Chưa login → "Sign in" */}
            {!user && (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Sign in</Link>
              </li>
            )}

            {/* Đã login → "Sign out" + dropdown tên user (Account/Wishlist/Logout) */}
            {user && (
              <>
                <li className="nav-item">
                  <button className="nav-link btn btn-link p-0" onClick={handleLogout}>
                    Sign out
                  </button>
                </li>

                <li className="nav-item">
                  <Dropdown align="end">
                    <Dropdown.Toggle variant="outline-dark" size="sm">
                      {displayName}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      {/* 👉 Account dẫn tới /account */}
                      <Dropdown.Item as={Link} to="/account">Account</Dropdown.Item>
                      <Dropdown.Item as={Link} to="/wishlist">Wishlist</Dropdown.Item>
                      <Dropdown.Divider />
                      <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

function Shell() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/cart" element={<Cart />} />
        {/* Checkout bắt buộc login */}
        <Route
          path="/checkout"
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        {/* ✅ Trang Account bắt buộc login */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="*"
          element={
            <div className="container py-4">
              <h3>404 - Không tìm thấy trang</h3>
              <Link to="/" className="btn btn-primary mt-3">Về trang chủ</Link>
            </div>
          }
        />
      </Routes>

      <footer className="text-center py-4 mt-4 text-muted" style={{ background: "#f6f3ee" }}>
        © 2025 Richie Electronics — <a href="https://github.com/ugnttad" target="_blank" rel="noreferrer">GitHub</a>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <BrowserRouter>
            <Shell />
          </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}
