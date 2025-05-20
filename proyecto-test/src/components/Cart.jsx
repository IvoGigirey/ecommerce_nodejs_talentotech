const Cart = ({ cartItems, removeFromCart }) => {
  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="cart">
      <h2>Carrito de compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item, idx) => (
              <li key={idx}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
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
                </div>
                <div className="cart-item-actions">
                  <span className="cart-item-price">${item.price.toFixed(2)}</span>
                  <button className="cart-remove-btn" onClick={() => removeFromCart(idx)}>
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
