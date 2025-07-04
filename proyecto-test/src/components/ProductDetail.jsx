import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";

const ProductDetail = ({ addToCart, productosExtra = [] }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    // Si el id empieza con "admin-", es un producto local
    if (id.startsWith("admin-")) {
      const localProduct = productosExtra.find((p, idx) => `admin-${idx + 1}` === id);
      if (localProduct) {
        setProduct(localProduct);
        setLoading(false);
      } else {
        setError("Producto no encontrado");
        setLoading(false);
      }
    } else {
      setLoading(true);
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => {
          if (!res.ok) throw new Error("Error al cargar el producto");
          return res.json();
        })
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id, productosExtra]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
    Swal.fire({
      title: "Producto agregado",
      html: `${product.title}<br>x${quantity}<br>Ha sido agregado al carrito.`,
      icon: "success",
    });
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">
        ← Volver
      </Link>
      <h2>{product.title}</h2>
      {/* Si el producto local no tiene imagen, no la muestres */}
      {product.image && <img src={product.image} alt={product.title} />}
      <p>{product.description}</p>
      <div className="price">
        <p>Precio: ${product.price}</p>
      </div>
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

export default ProductDetail;
