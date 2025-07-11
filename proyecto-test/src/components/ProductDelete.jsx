async function deleteProduct(id) {
  const res = await fetch(`https://687132af7ca4d06b34b9af59.mockapi.io/productos/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Error al eliminar producto");
  return await res.json();
}

const handleDelete = (id) => {
  Swal.fire({
    title: "¿Eliminar producto?",
    text: "Esta acción no se puede deshacer.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        await deleteProduct(id);
        Swal.fire("Eliminado", "Producto eliminado correctamente.", "success");
      } catch (err) {
        Swal.fire("Error", err.message, "error");
      }
    }
  });
};