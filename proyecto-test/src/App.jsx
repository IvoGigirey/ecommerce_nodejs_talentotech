import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { useAuthContext } from "./context/AuthContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Login from "./components/Login";
import Admin from "./components/Admin";

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
      className="floating-cart-container"
    >
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const { user } = useAuthContext();
  const [productos, setProductos] = useState([]);

  const addToCart = (product, quantity) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity }];
      }
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

  const clearCart = () => setCartItems([]);

  return (
    <Router>
      <Navbar cartCount={cartItems.length} isAdmin={isAdmin} isUser={isUser} />
      <div className="app">
        <Routes>
          <Route
            path="/"
            element={
              <ProductList
                addToCart={addToCart}
                productosExtra={productos} // productos es el estado global de productos agregados por admin
              />
            }
          />
          <Route
            path="/cart"
            element={
              <ProtectedRoute isAllowed={cartItems.length > 0}>
                <Cart
                  cartItems={cartItems}
                  removeFromCart={removeFromCart}
                  clearCart={clearCart}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/product/:id"
            element={<ProductDetail addToCart={addToCart} productosExtra={productos} />}
          />
          <Route path="/login" element={<Login setIsAdmin={setIsAdmin} />} />
          <Route
            path="/admin"
            element={
              <Admin productos={productos} setProductos={setProductos} />
            }
          />
        </Routes>
        <FloatingCartButton count={cartItems.length} showAdded={showAdded} />
      </div>
    </Router>
  );
}

export default App;
