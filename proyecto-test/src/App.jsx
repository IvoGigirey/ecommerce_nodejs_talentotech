import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";

function FloatingCartButton({ count, showAdded }) {
  const navigate = useNavigate();
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {showAdded && <div className="cart-added-message">Producto añadido</div>}
      <button
        className="floating-cart-btn"
        onClick={() => navigate("/cart")}
        aria-label="Ir al carrito"
      >
        🛒
        {count > 0 && <span className="cart-badge">{count}</span>}
      </button>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showAdded, setShowAdded] = useState(false);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const found = prevItems.find((item) => item.id === product.id);
      if (found) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
    setShowAdded(true);
    setTimeout(() => setShowAdded(false), 1500);
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
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
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} />}
          />
        </Routes>
        <FloatingCartButton count={cartItems.length} showAdded={showAdded} />
      </div>
    </Router>
  );
}

export default App;
