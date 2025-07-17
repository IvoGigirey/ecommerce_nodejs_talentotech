import { useAuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { logout, user } = useAuthContext();
  const navigate = useNavigate();

  if (!user) return null;

  const handleLogout = () => {
    logout();

    Swal.fire({
      icon: "success",
      title: "Sesión cerrada",
      text: "Has cerrado sesión exitosamente.",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/");
  };

  return (
    <div className="admin-panel">
      <h3>Bienvenido, {user}</h3>
      <button onClick={handleLogout} className="logout-button">
        Cerrar sesión
      </button>
    </div>
  );
};

export default LogoutButton;
