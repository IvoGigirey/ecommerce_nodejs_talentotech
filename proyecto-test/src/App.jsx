import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuthContext } from "./context/AuthContext";
import { CarritoProvider, useCarritoContext } from "./context/CarritoContext";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import ProductDetail from "./components/ProductDetail";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import "./App.css";
import Login from "./components/Login";
import Admin from "./components/Admin";
import FloatingCartButton from "./components/FloatingCartButton";
import { Helmet } from "react-helmet";
import LogoutButton from "./components/LogoutButton";

function App() {
  const [productos, setProductos] = useState([]);
  const { addToCart } = useCarritoContext();

  return (
    <>
      <Helmet>
        <title>eCommerce | Tu tienda online</title>
        <meta
          name="description"
          content="Compra productos y administra tu tienda online fácilmente."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>
      <AuthProvider>
        <CarritoProvider>
          <Router>
            <Navbar />
            <div className="app">
              <LogoutButton />
              <Routes>
                <Route
                  path="/"
                  element={<ProductList addToCart={addToCart} />}
                />
                <Route
                  path="/cart"
                  element={
                    <ProtectedRoute>
                      <Cart />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/product/:id"
                  element={<ProductDetail addToCart={addToCart} />}
                />
                <Route path="/login" element={<Login />} />
                <Route
                  path="/admin"
                  element={
                    <Admin productos={productos} setProductos={setProductos} />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
              <FloatingCartButton />
            </div>
          </Router>
        </CarritoProvider>
      </AuthProvider>
    </>
  );
}

export default App;
