import { Link } from "react-router-dom";

const Navbar = ({ cartCount }) => (
  <nav className="navbar">
    <div className="navbar-logo">
      <span role="img" aria-label="logo">🛍️</span> <span className="navbar-title">eCommerce</span>
    </div>
    <div className="navbar-links">
      <Link to="/" className="nav-link">Productos</Link>
      <Link to="/cart" className="nav-link nav-cart">
        <span role="img" aria-label="cart">🛒</span>
        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
      </Link>
    </div>
  </nav>
);

export default Navbar;