import React, { useMemo, useState } from "react";
import { CartProvider } from "./context/CartContext";
import { ThemeProvider } from "./context/ThemeContext";
import Header from "./components/Header";
import Hero from "./components/Hero";
import DishesList from "./components/DishesList";
import Cart from "./components/Cart";
import CheckoutModal from "./components/CheckoutModal"; // <-- thêm import này
import "./styles.css";

const sampleDishes = [
  {
    id: 1,
    name: "Uthappizza",
    price: "4.99",
    description: "A unique combination of Indian Uthappam and Italian pizza.",
    image: "./images/1.jpg",
    category: "Fusion",
    rating: 4.5
  },
  {
    id: 2,
    name: "Zucchipakoda",
    price: "1.99",
    description: "Deep fried zucchini coated with mildly spiced chickpea flour batter.",
    image: "./images/2.jpg",
    category: "Snacks",
    rating: 4.2
  },
  {
    id: 3,
    name: "Vadonut",
    price: "1.99",
    description: "A quintessential ConFusion experience.",
    image: "./images/3.jpg",
    category: "Dessert",
    rating: 4.0
  }
];

export default function App() {
  const [query, setQuery] = useState("");
  const dishes = useMemo(() => sampleDishes, []);

  return (
    <ThemeProvider>
      <CartProvider>
        <Header />
        <div className="container app-container">
          <Hero query={query} setQuery={setQuery} />

          <div className="row g-4">
            <div className="col-lg-8" id="menu">
              <DishesList dishes={dishes} query={query} />
            </div>
            <div className="col-lg-4">
              <Cart />
            </div>
          </div>

          <footer className="mt-5 border-top pt-3 text-center text-secondary">
            © {new Date().getFullYear()} Food Court · Bootstrap 5
          </footer>
        </div>

        {/* Modal & Toast được portal ra body */}
        <CheckoutModal />
      </CartProvider>
    </ThemeProvider>
  );
}
