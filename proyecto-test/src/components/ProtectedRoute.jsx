import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import Swal from "sweetalert2";

const ProtectedRoute = ({ children, isAllowed }) => {
  useEffect(() => {
    if (!isAllowed) {
      const justCleared = sessionStorage.getItem("cartJustCleared");
      if (!justCleared) {
        Swal.fire({
          title: "Acceso denegado",
          text: "El carrito está vacío.",
          icon: "warning",
        });
      }
      sessionStorage.removeItem("cartJustCleared");
    }
  }, [isAllowed]);

  if (!isAllowed) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
