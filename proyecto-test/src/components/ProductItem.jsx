import { Link } from "react-router-dom";

const ProductItem = ({ product, addToCart }) => (
  <div className="product-item">
    <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
    </Link>
    <p>Precio: ${product.price}</p>
    <button onClick={() => addToCart(product)}>Agregar al carrito</button>
  </div>
);

export default ProductItem;