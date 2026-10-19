// Lógica del carrito como funciones puras: reciben el carrito y devuelven uno nuevo.

export function agregarItem(carrito, producto) {
  const existente = carrito.find((i) => i.codigo === producto.codigo)
  const cantidadActual = existente ? existente.cantidad : 0

  if (cantidadActual >= producto.stock) {
    return { carrito, ok: false, mensaje: `No queda más stock de "${producto.nombre}".` }
  }

  const nuevo = existente
    ? carrito.map((i) => (i.codigo === producto.codigo ? { ...i, cantidad: i.cantidad + 1 } : i))
    : [
        ...carrito,
        {
          codigo: producto.codigo,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          categoria: producto.categoria,
          stock: producto.stock,
          cantidad: 1,
        },
      ]

  return { carrito: nuevo, ok: true, mensaje: `"${producto.nombre}" añadido al carrito.` }
}

export function cambiarCantidad(carrito, codigo, cantidad) {
  if (cantidad <= 0) return quitarItem(carrito, codigo)
  return carrito.map((i) =>
    i.codigo === codigo ? { ...i, cantidad: Math.min(cantidad, i.stock ?? cantidad) } : i,
  )
}

export function quitarItem(carrito, codigo) {
  return carrito.filter((i) => i.codigo !== codigo)
}

export function calcularTotal(carrito) {
  return carrito.reduce((suma, i) => suma + i.precio * i.cantidad, 0)
}

export function contarItems(carrito) {
  return carrito.reduce((suma, i) => suma + i.cantidad, 0)
}

// Resta del stock lo comprado. Devuelve null si algún producto ya no alcanza.
export function descontarStock(productos, items) {
  for (const item of items) {
    const p = productos.find((x) => x.codigo === item.codigo)
    if (!p || p.stock < item.cantidad) return null
  }
  return productos.map((p) => {
    const item = items.find((i) => i.codigo === p.codigo)
    return item ? { ...p, stock: p.stock - item.cantidad } : p
  })
}
