import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";
import { createUser as firebaseCreateUser } from "../auth/firebase";
import Swal from "sweetalert2";

function Login() {
  const { login } = useAuthContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "1234") {
      login(username, true);
      Swal.fire({
        title: "¡Login exitoso!",
        text: "Bienvenido, " + username,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/admin");
      });
    } else if (username === "user" && password === "1234") {
      login(username, false);
      Swal.fire({
        title: "¡Login exitoso!",
        text: "Bienvenido, " + username,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        navigate("/");
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
      await firebaseCreateUser(registerUsername, registerPassword);
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
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
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
      <form
        onSubmit={handleRegister}
        className="login-form"
        style={{ marginTop: "50px" }}
      >
        <input
          type="text"
          placeholder="Email"
          value={registerUsername}
          onChange={(e) => setRegisterUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={registerPassword}
          onChange={(e) => setRegisterPassword(e.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
}

export default Login;
