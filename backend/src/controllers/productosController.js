import * as Producto from "../models/productoModel.js";

export function listar(req, res) {
  const { categoria } = req.query;

  if (categoria) {
    const valida = Producto.CATEGORIAS_PERMITIDAS.find(
      (c) => c.toLowerCase() === categoria.toLowerCase()
    );
    if (!valida) {
      return res.status(422).json({ error: `Categoría inválida: '${categoria}'` });
    }
    return res.json(Producto.obtenerTodos(valida));
  }

  res.json(Producto.obtenerTodos());
}

export function obtener(req, res) {
  const producto = Producto.obtenerPorId(req.params.id);
  if (!producto) {
    return res.status(404).json({ error: `No existe el producto ${req.params.id}` });
  }
  res.json(producto);
}

export function crear(req, res) {
  const nuevo = Producto.crear(req.body);
  res.status(201).json(nuevo);
}

export function actualizar(req, res) {
  const producto = Producto.actualizar(req.params.id, req.body);
  if (!producto) {
    return res.status(404).json({ error: `No existe el producto ${req.params.id}` });
  }
  res.json(producto);
}

export function eliminar(req, res) {
  const borrado = Producto.eliminar(req.params.id);
  if (!borrado) {
    return res.status(404).json({ error: `No existe el producto ${req.params.id}` });
  }
  res.status(204).end();
}