import { useEffect, useState } from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ productosExtra = [] }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    fetch("https://687132af7ca4d06b34b9af59.mockapi.io/productos")
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

  const allProducts = [
    ...products,
    ...productosExtra.map((prod, idx) => ({
      ...prod,
      id: `admin-${idx + 1}`,
    })),
  ];

  const categories = Array.from(
    new Set(allProducts.map((p) => p.category).filter(Boolean))
  );

  const filteredProducts = allProducts.filter(
    (product) =>
      (product.title.toLowerCase().includes(search.toLowerCase()) ||
        (product.category &&
          product.category.toLowerCase().includes(search.toLowerCase()))) &&
      (selectedCategory ? product.category === selectedCategory : true)
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handlePageChange = (page) => setCurrentPage(page);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>PRODUCTOS</h2>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "1rem",
          flexWrap: "wrap",
        }}
      >
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginBottom: "1rem", width: "100%", maxWidth: 300 }}
          aria-label="Buscar productos"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setCurrentPage(1);
          }}
          style={{ marginBottom: "1rem", maxWidth: 200 }}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div className="product-list">
        {paginatedProducts.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
      <div
        style={{
          margin: "1rem 0",
          display: "flex",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={currentPage === i + 1}
            style={{
              padding: "0.5rem 1rem",
              background: currentPage === i + 1 ? "#222" : "#eee",
              color: currentPage === i + 1 ? "#fff" : "#222",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            aria-label={`Página ${i + 1}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
