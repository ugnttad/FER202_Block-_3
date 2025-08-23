import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Product from "../pages/Product";
import ProductDetail from "../pages/ProductDetail";
import Cart from "../pages/Cart";
import Login from "../pages/Login";          // <-- dùng file mới
import Favourites from "../Favourites";      // bạn đang để ở gốc src
import Checkout from "../Checkout";
import Register from "../pages/Register";    // nếu đã có file Register ở pages

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/products" element={<Product />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/favourites" element={<Favourites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="*" element={<div className="container py-5">Not Found</div>} />
        </Routes>
    );
}
