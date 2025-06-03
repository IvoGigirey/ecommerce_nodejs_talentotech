import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span role="img" aria-label="logo">🛍️</span> <span className="navbar-title">eCommerce</span>
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
        <Link to="/" className="nav-link" onClick={() => setOpen(false)}>PRODUCTOS</Link>
        <Link to="/cart" className="nav-link nav-cart" onClick={() => setOpen(false)}>
          <span role="img" aria-label="cart">🛒</span>
          {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;