import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ addToCart, productosExtra = [] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar productos");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Unir productos de la API y los agregados por admin
  const allProducts = [
    ...products,
    ...productosExtra.map((prod, idx) => ({
      ...prod,
      id: `admin-${idx + 1}`, // Genera un id único para los productos agregados
    })),
  ];

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>PRODUCTOS</h2>
      <div className="product-list">
        {allProducts.map((product) => (
          <ProductItem
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
