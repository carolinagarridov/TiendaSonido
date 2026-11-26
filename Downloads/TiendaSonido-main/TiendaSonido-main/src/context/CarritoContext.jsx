import { createContext, useContext, useEffect, useState } from 'react'
import { guardarCarrito, obtenerCarrito } from '../services/almacenamiento'
import {
  agregarItem,
  calcularTotal,
  cambiarCantidad,
  contarItems,
  quitarItem,
} from '../utils/carrito'

const CarritoContext = createContext(null)

export function CarritoProvider({ children }) {
  const [carrito, setCarrito] = useState(() => obtenerCarrito())
  // Aviso que se muestra como Toast (reemplaza los alert() del proyecto original)
  const [aviso, setAviso] = useState(null)

  useEffect(() => {
    guardarCarrito(carrito)
  }, [carrito])

  function agregar(producto) {
    const resultado = agregarItem(carrito, producto)
    setCarrito(resultado.carrito)
    setAviso({ texto: resultado.mensaje, tipo: resultado.ok ? 'success' : 'warning', id: Date.now() })
    return resultado.ok
  }

  const valor = {
    carrito,
    agregar,
    cambiarCantidad: (codigo, cantidad) => setCarrito((c) => cambiarCantidad(c, codigo, cantidad)),
    quitar: (codigo) => setCarrito((c) => quitarItem(c, codigo)),
    vaciar: () => setCarrito([]),
    total: calcularTotal(carrito),
    cantidadItems: contarItems(carrito),
    aviso,
    cerrarAviso: () => setAviso(null),
  }

  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useCarrito() {
  const ctx = useContext(CarritoContext)
  if (!ctx) throw new Error('useCarrito debe usarse dentro de <CarritoProvider>')
  return ctx
}
