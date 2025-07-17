import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarritoContext } from "../context/CarritoContext";
import { useAuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { cartItems } = useCarritoContext();
  const { user, isAdmin } = useAuthContext();

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="logo">
          🛍️
        </span>{" "}
        <span className="navbar-title">eCommerce</span>
      </div>
      <button
        className="navbar-burger"
        aria-label="Abrir menú"
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <div className={`navbar-links${open ? " open" : ""}`}>
        {!user && (
          <Link to="/login" className="nav-link" onClick={() => setOpen(false)}>
            LOGIN
          </Link>
        )}
        <Link to="/" className="nav-link" onClick={() => setOpen(false)}>
          PRODUCTOS
        </Link>
        {isAdmin && (
          <Link to="/admin" className="nav-link" onClick={() => setOpen(false)}>
            ADMINISTRACIÓN
          </Link>
        )}
        <Link
          to="/cart"
          className="nav-link nav-cart"
          onClick={() => setOpen(false)}
        >
          <span role="img" aria-label="cart">
            🛒
          </span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
