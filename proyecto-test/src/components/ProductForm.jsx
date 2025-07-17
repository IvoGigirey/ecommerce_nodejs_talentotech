import { useState } from "react";
import Swal from "sweetalert2";

export default function ProductForm({ onProductAdded }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) {
      Swal.fire("Error", "El nombre es obligatorio.", "error");
      return;
    }
    if (Number(price) <= 0) {
      Swal.fire("Error", "El precio debe ser mayor a 0.", "error");
      return;
    }
    if (description.length < 10) {
      Swal.fire(
        "Error",
        "La descripción debe tener al menos 10 caracteres.",
        "error"
      );
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://687132af7ca4d06b34b9af59.mockapi.io/productos",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, description, price: Number(price) }),
        }
      );
      if (!res.ok) throw new Error("Error al crear producto");
      const newProduct = await res.json();
      Swal.fire("¡Éxito!", "Producto agregado correctamente.", "success");
      setTitle("");
      setDescription("");
      setPrice("");
      onProductAdded(newProduct);
    } catch (err) {
      Swal.fire("Error", err.message, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-product-form">
      <h2>Agregar producto</h2>
      <input
        type="text"
        placeholder="Nombre"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        type="number"
        placeholder="Precio"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        min="0"
        step="0.01"
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        Agregar
      </button>
    </form>
  );
}
