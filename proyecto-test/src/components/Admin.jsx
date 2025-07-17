import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ProductForm from "./ProductForm";
import Swal from "sweetalert2";

export default function Admin({ productos, setProductos }) {
  const { user, logout, isAdmin } = useAuthContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const fetchProducts = async () => {
    const res = await fetch(
      "https://687132af7ca4d06b34b9af59.mockapi.io/productos"
    );
    const data = await res.json();
    setProductos(data);
  };

  const handleProductAdded = () => {
    fetchProducts();
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    });
    if (result.isConfirmed) {
      try {
        const res = await fetch(
          `https://687132af7ca4d06b34b9af59.mockapi.io/productos/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!res.ok) throw new Error("Error al eliminar producto");
        Swal.fire("Eliminado", "Producto eliminado correctamente.", "success");
        fetchProducts();
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(productos.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = productos.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (!isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="admin-panel">
      <h2>Panel de Administración</h2>
      <p>Bienvenido, {user}</p>
      <button onClick={logout} className="logout-button">
        Cerrar sesión
      </button>

      <ProductForm onProductAdded={handleProductAdded} />

      <h3>Lista de productos</h3>
      <ul>
        {currentProducts.map((prod) => (
          <li key={prod.id}>
            <strong>{prod.title}</strong> - {prod.description} - ${prod.price}
            <button
              style={{ marginLeft: "1rem" }}
              onClick={() => handleDelete(prod.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <div className="page-buttons-div">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="page-buttons"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => goToPage(i + 1)}
            className="page-buttons"
            style={{
              fontWeight: currentPage === i + 1 ? "bold" : "normal",
            }}
          >
            {i + 1}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="page-buttons"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
