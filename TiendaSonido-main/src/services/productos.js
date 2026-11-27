const API = import.meta.env.VITE_API_URL;

export const CATEGORIAS = [
  "Guitarras Acústicas",
  "Guitarras Eléctricas",
  "Bajos Eléctricos",
  "Baterías y Percusión",
  "Teclados y Pianos",
  "Audio y Sonido",
];

async function pedir(ruta, opciones = {}) {
  let res;
  try {
    res = await fetch(`${API}${ruta}`, {
      headers: { "Content-Type": "application/json" },
      ...opciones,
    });
  } catch {
    throw new Error(
      "No se pudo conectar con la API. Verifica que el backend esté corriendo en el puerto 3000."
    );
  }

  if (!res.ok) {
    const cuerpo = await res.json().catch(() => ({}));
    throw new Error(cuerpo.error || `Error HTTP ${res.status}`);
  }

  if (res.status === 204) return null;
  return res.json();
}

export function obtenerProductos(categoria = "") {
  const query = categoria ? `?categoria=${encodeURIComponent(categoria)}` : "";
  return pedir(`/productos${query}`);
}

export function obtenerProductoPorId(id) {
  return pedir(`/productos/${encodeURIComponent(id)}`);
}

export function crearProducto(producto) {
  return pedir("/productos", {
    method: "POST",
    body: JSON.stringify(producto),
  });
}

export function actualizarProducto(id, producto) {
  return pedir(`/productos/${encodeURIComponent(id)}`, {
    method: "PUT",
    body: JSON.stringify(producto),
  });
}

export function eliminarProducto(id) {
  return pedir(`/productos/${encodeURIComponent(id)}`, {
    method: "DELETE",
  });
}