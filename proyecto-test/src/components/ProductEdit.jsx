async function editProduct(id, updatedData) {
  const res = await fetch(`https://687132af7ca4d06b34b9af59.mockapi.io/productos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Error al editar producto");
  return await res.json();
}