import { useCarritoContext } from "../context/CarritoContext";
import { useNavigate } from "react-router-dom";

export default function FloatingCartButton() {
  const { cartItems } = useCarritoContext();
  const navigate = useNavigate();
  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </div>
  );
}