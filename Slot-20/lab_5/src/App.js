import React from "react";
import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";
import AppNavBar from "./pages/AppNavBar";     // <-- đúng theo cây thư mục

import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { FavouritesProvider } from "./contexts/FavouritesContext";
import { ToastProvider } from "./contexts/ToastContext";

import "./styles/custom.css";                  // <-- CSS đang ở /styles
import "./App.css";

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartProvider>
          <FavouritesProvider>
            <ToastProvider>
              <BrowserRouter>
                <AppNavBar />
                <AppRoutes />
              </BrowserRouter>
            </ToastProvider>
          </FavouritesProvider>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
