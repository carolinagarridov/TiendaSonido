export function rutaNoEncontrada(req, res) {
  res.status(404).json({ error: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
}

export function manejadorErrores(err, req, res, next) {
  console.error("Error:", err.message);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Error interno del servidor" : err.message,
  });
}