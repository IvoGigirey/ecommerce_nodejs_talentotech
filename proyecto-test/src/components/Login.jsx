import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { createUser as firebaseCreateUser } from "../auth/firebase";
import Swal from "sweetalert2";

function Login({ setIsAdmin }) {
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      setIsAdmin(true); // Esto actualiza el estado global
      login(username);
      Swal.fire({
        title: "¡Login exitoso!",
        text: "Bienvenido, admin.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin");
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Usuario o contraseña incorrectos",
        icon: "error",
      });
    }
  };

  async function handleRegister(e) {
    e.preventDefault();
    try {
      await firebaseCreateUser(username, password);
      Swal.fire({
        title: "¡Registro exitoso!",
        text: "Ya puedes iniciar sesión.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      login(username);
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Ingresar</button>
      </form>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Login;