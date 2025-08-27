// src/App.jsx
import "./App.css";
import AppRoutes from "./routes/AppRoutes.jsx";
import AppNavbar from "./components/Navbar.jsx"; // 👈 trỏ tới file Navbar.jsx, export default AppNavbar
import Footer from "./components/Footer.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";
import CartProvider from "./contexts/CartContext.jsx";
import FavouritesProvider from "./contexts/FavouritesContext.jsx";
import ToastProvider from "./contexts/ToastContext.jsx";
import ThemeProvider from "./contexts/ThemeContext.jsx";

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <CartProvider>
            <FavouritesProvider>
              <div className="d-flex flex-column min-vh-100">
                <AppNavbar />
                <div className="container py-4 flex-grow-1">
                  <AppRoutes />
                </div>
                <Footer />
              </div>
            </FavouritesProvider>
          </CartProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
