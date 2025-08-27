// src/routes/AppRoutes.jsx
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductsPage from "../pages/ProductsPage.jsx";   // 👈 thêm .jsx
import ProductDetails from "../pages/ProductDetails.jsx";
import LoginPage from "../pages/LoginPage.jsx";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
    );
}
