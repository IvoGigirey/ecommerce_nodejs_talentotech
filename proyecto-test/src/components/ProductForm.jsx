import { useState } from "react";
import Swal from "sweetalert2";

export default function ProductForm({ onAddProduct }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !description || !price) {
      Swal.fire({
        title: "Error",
        text: "Completa todos los campos",
        icon: "error",
      });
      return;
    }
    if (isNaN(Number(price)) || Number(price) <= 0) {
      Swal.fire({
        title: "Error",
        text: "El precio debe ser un número positivo",
        icon: "error",
      });
      return;
    }
    onAddProduct({ title, description, price: Number(price) });
    Swal.fire({
      title: "Producto añadido",
      text: "El producto fue agregado correctamente.",
      icon: "success",
      timer: 1200,
      showConfirmButton: false,
    });
    setTitle("");
    setDescription("");
    setPrice("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Agregar producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Descripción"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={e => setPrice(e.target.value)}
        min="0"
        step="0.01"
      />
      <button type="submit">Agregar</button>
    </form>
  );
}