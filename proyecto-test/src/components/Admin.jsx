import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import ProductForm from "./ProductForm";

export default function Admin({ productos, setProductos }) {
  const { user } = useAuthContext();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleAddProduct = (product) => {
    setProductos((prev) => [...prev, product]);
  };

  return (
    <div>
      <h2>Panel de Administración</h2>
      <ProductForm onAddProduct={handleAddProduct} />
      <h3>Lista de productos</h3>
      <ul>
        {productos.map((prod, idx) => (
          <li key={idx}>
            <strong>{prod.nombre}</strong> - {prod.descripcion} - ${prod.precio}
          </li>
        ))}
      </ul>
    </div>
  );
}
