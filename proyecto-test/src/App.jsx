import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function FloatingCartButton({ count }) {
  const navigate = useNavigate();
  return (
    <button
      className="floating-cart-btn"
      onClick={() => navigate("/cart")}
      aria-label="Ir al carrito"
    >
      🛒
      {count > 0 && <span className="cart-badge">{count}</span>}
    </button>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (indexToRemove) => {
    setCartItems((prevItems) =>
      prevItems.filter((_, idx) => idx !== indexToRemove)
    );
  };

  return (
    <Router>
      <Navbar cartCount={cartItems.length} />
      <div className="app">
        <Routes>
          <Route path="/" element={<ProductList addToCart={addToCart} />} />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAllowed={cartItems.length > 0}>
                <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
              </ProtectedRoute>
            }
          />
          <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
        </Routes>
        <FloatingCartButton count={cartItems.length} />
      </div>
    </Router>
  );
}

export default App;
