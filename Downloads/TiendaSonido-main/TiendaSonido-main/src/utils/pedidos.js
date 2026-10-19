export const ESTADOS_PEDIDO = ['En preparación', 'Despachado', 'Entregado']

export const COLOR_ESTADO = {
  'En preparación': 'warning',
  Despachado: 'info',
  Entregado: 'success',
}

export function crearPedido({ carrito, usuario, entrega, pedidosExistentes = [] }) {
  const ultimo = pedidosExistentes.reduce((max, p) => Math.max(max, p.numero), 1000)
  return {
    numero: ultimo + 1,
    fecha: new Date().toISOString(),
    cliente: { correo: usuario.correo, nombre: `${usuario.nombre} ${usuario.apellidos ?? ''}`.trim() },
    items: carrito.map(({ codigo, nombre, precio, cantidad }) => ({ codigo, nombre, precio, cantidad })),
    total: carrito.reduce((s, i) => s + i.precio * i.cantidad, 0),
    entrega,
    estado: ESTADOS_PEDIDO[0],
  }
}
