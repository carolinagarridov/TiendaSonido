// Imagen de respaldo por categoría (public/img/categorias/*.svg)
const SLUGS = {
  'Guitarras Acústicas': 'guitarras-acusticas',
  'Guitarras Eléctricas': 'guitarras-electricas',
  'Bajos Eléctricos': 'bajos-electricos',
  'Baterías': 'baterias',
  'Teclados y Pianos': 'teclados-pianos',
  'Amplificadores': 'amplificadores',
  'Micrófonos': 'microfonos',
  'Pedales de Efectos': 'pedales',
  'Accesorios': 'accesorios',
  'Estudio y Grabación': 'estudio',
}

export function imagenCategoria(categoria) {
  return `img/categorias/${SLUGS[categoria] ?? 'accesorios'}.svg`
}

// Antepone la base de Vite para que las rutas funcionen también si se publica en una subcarpeta.
export function rutaPublica(ruta) {
  if (!ruta) return ''
  if (/^(https?:|data:|blob:)/.test(ruta)) return ruta
  return import.meta.env.BASE_URL + ruta.replace(/^\//, '')
}
