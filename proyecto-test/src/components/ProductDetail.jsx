import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar el producto");
        return res.json();
      })
      .then(data => {
        setProduct(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!product) return null;

  return (
    <div className="product-detail-container">
      <Link to="/" className="back-link">← Volver</Link>
      <h2>{product.title}</h2>
      <img src={product.image} alt={product.title} />
      <p>{product.description}</p>
      <div className="price"><b>Precio:</b> ${product.price}</div>
      <button onClick={() => addToCart(product)}>Agregar al carrito</button>
    </div>
  );
};

export default ProductDetail;