export const CATEGORIAS_PERMITIDAS = [
  "Guitarras Acústicas",
  "Guitarras Eléctricas",
  "Bajos Eléctricos",
  "Baterías y Percusión",
  "Teclados y Pianos",
  "Audio y Sonido",
];

let productos = [
  {
    id: 1,
    codigo: "GTR-001",
    nombre: "Guitarra Acústica Dreadnought",
    categoria: "Guitarras Acústicas",
    marca: "Yamaha",
    modelo: "F310",
    precio: 189990,
    stock: 8,
    descripcion: "Tapa de abeto con cuerpo de meranti, ideal para estudio y escenario.",
  },
  {
    id: 2,
    codigo: "GTR-002",
    nombre: "Guitarra Eléctrica Stratocaster",
    categoria: "Guitarras Eléctricas",
    marca: "Fender",
    modelo: "Player II",
    precio: 749990,
    stock: 4,
    descripcion: "Tres cápsulas single-coil Alnico V y mástil de arce satinado.",
  },
  {
    id: 3,
    codigo: "BAJ-001",
    nombre: "Bajo Eléctrico 4 Cuerdas",
    categoria: "Bajos Eléctricos",
    marca: "Ibanez",
    modelo: "GSR200",
    precio: 299990,
    stock: 5,
    descripcion: "Cuerpo liviano con ecualizador activo Phat II Boost.",
  },
];

let siguienteId = 4;

export function obtenerTodos(categoria) {
  if (!categoria) return productos;
  return productos.filter(
    (p) => p.categoria.toLowerCase() === categoria.toLowerCase()
  );
}

export function obtenerPorId(idOCodigo) {
  return productos.find(
    (p) =>
      p.id === Number(idOCodigo) ||
      p.codigo?.toUpperCase() === String(idOCodigo).toUpperCase()
  );
}

export function crear(datos) {
  const idActual = siguienteId++;
  const nuevo = {
    id: idActual,
    codigo: datos.codigo?.trim().toUpperCase() || `PRD-${String(idActual).padStart(3, "0")}`,
    nombre: datos.nombre.trim(),
    categoria: datos.categoria || "Audio y Sonido",
    marca: (datos.marca || "Genérica").trim(),
    modelo: (datos.modelo || "").trim(),
    precio: Number(datos.precio ?? 0),
    stock: Number(datos.stock ?? 0),
    descripcion: (datos.descripcion || "").trim(),
  };
  productos.push(nuevo);
  return nuevo;
}

export function actualizar(idOCodigo, datos) {
  const producto = obtenerPorId(idOCodigo);
  if (!producto) return null;

  if (datos.codigo) producto.codigo = datos.codigo.trim().toUpperCase();
  producto.nombre = datos.nombre.trim();
  producto.categoria = datos.categoria || producto.categoria;
  producto.marca = datos.marca !== undefined ? datos.marca.trim() : producto.marca;
  producto.modelo = datos.modelo !== undefined ? datos.modelo.trim() : producto.modelo;
  producto.precio = datos.precio !== undefined ? Number(datos.precio) : producto.precio;
  producto.stock = datos.stock !== undefined ? Number(datos.stock) : producto.stock;
  producto.descripcion =
    datos.descripcion !== undefined ? datos.descripcion.trim() : producto.descripcion;

  return producto;
}

export function eliminar(idOCodigo) {
  const largoAntes = productos.length;
  productos = productos.filter(
    (p) =>
      p.id !== Number(idOCodigo) &&
      p.codigo?.toUpperCase() !== String(idOCodigo).toUpperCase()
  );
  return productos.length < largoAntes;
}