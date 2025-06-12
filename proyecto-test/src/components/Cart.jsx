import { useState } from "react";
import Swal from "sweetalert2";

const Cart = ({ cartItems, removeFromCart, clearCart }) => {
  const [removingIndex, setRemovingIndex] = useState(null);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleRemove = (productId) => {
    setRemovingIndex(productId);
    setTimeout(() => {
      removeFromCart(productId);
      setRemovingIndex(null);
    }, 400);
  };

  const handleClear = () => {
    Swal.fire({
      title: "Carrito vaciado",
      text: "Todos los productos han sido eliminados del carrito.",
      icon: "success",
    }).then(() => {
      sessionStorage.setItem("cartJustCleared", "true");
      clearCart();
    });
  };

  return (
    <div className="cart">
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <button
            style={{ marginBottom: "1rem", background: "#ff5252" }}
            onClick={handleClear}
          >
            Vaciar carrito
          </button>
          <ul>
            {cartItems.map((item) => (
              <li
                key={item.id}
                className={removingIndex === item.id ? "removing" : ""}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "1rem" }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: 40,
                      height: 40,
                      objectFit: "contain",
                      borderRadius: 4,
                    }}
                  />
                  <span>{item.title}</span>
                  <span style={{ fontWeight: "bold", marginLeft: 8 }}>
                    x{item.quantity}
                  </span>
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                  <button
                    className="cart-remove-btn"
                    onClick={() => handleRemove(item.id)}
                    disabled={removingIndex === item.id}
                  >
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div>Total: ${total.toFixed(2)}</div>
        </>
      )}
    </div>
  );
};

export default Cart;
