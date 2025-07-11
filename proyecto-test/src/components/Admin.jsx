import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ProductForm from "./ProductForm";
import Swal from "sweetalert2";

export default function Admin({ productos, setProductos }) {
  const { user, logout } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const fetchProducts = async () => {
    const res = await fetch("https://687132af7ca4d06b34b9af59.mockapi.io/productos");
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
        const res = await fetch(`https://687132af7ca4d06b34b9af59.mockapi.io/productos/${id}`, {
          method: "DELETE",
        });
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

  return (
    <div>
      <h2>Panel de Administración</h2>
      <button
        onClick={logout}
        style={{
          marginBottom: "1rem",
          padding: "0.5rem 1rem",
          background: "#222",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Cerrar sesión
      </button>
      <ProductForm onProductAdded={handleProductAdded} />
      <h3>Lista de productos</h3>
      <ul>
        {productos.map((prod, idx) => (
          <li key={prod.id || idx}>
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
    </div>
  );
}
