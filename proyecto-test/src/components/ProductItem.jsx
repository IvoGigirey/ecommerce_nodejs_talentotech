import { useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { useCarritoContext } from "../context/CarritoContext";

const ProductItem = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCarritoContext();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
    Swal.fire({
      title: "Producto agregado",
      html: `${product.title}<br>x${quantity}<br>Ha sido agregado al carrito.`,
      icon: "success",
    });
  };

  return (
    <div className="product-item">
      <Link
        to={`/product/${product.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={product.image} alt={product.title} />
        <h3>{product.title}</h3>
      </Link>
      <p>Precio: ${product.price}</p>
      <div className="product-quantity">
        <label>
          <p>Cantidad: </p>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            style={{ width: "60px" }}
          />
        </label>
      </div>
      <button onClick={handleAddToCart}>Agregar al carrito</button>
    </div>
  );
};

export default ProductItem;
