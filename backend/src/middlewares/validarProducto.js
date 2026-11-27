import { CATEGORIAS_PERMITIDAS } from "../models/productoModel.js";

export function validarProducto(req, res, next) {
  const { nombre, categoria, precio } = req.body || {};

  if (typeof nombre !== "string" || nombre.trim() === "") {
    return res.status(422).json({ error: "El campo 'nombre' es obligatorio" });
  }

  if (
    categoria !== undefined &&
    !CATEGORIAS_PERMITIDAS.some((c) => c.toLowerCase() === String(categoria).toLowerCase())
  ) {
    return res.status(422).json({
      error: `Categoría no válida. Permitidas: ${CATEGORIAS_PERMITIDAS.join(", ")}`,
    });
  }

  if (precio !== undefined && (Number.isNaN(Number(precio)) || Number(precio) < 0)) {
    return res.status(422).json({ error: "El precio debe ser un número mayor o igual a 0" });
  }

  next();
}