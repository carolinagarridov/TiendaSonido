import { useState } from 'react'
import { guardarPedidos, obtenerPedidos } from '../services/almacenamiento'

/**
 * Hook para la gestión de pedidos en el panel de administración.
 */
export function useAdminPedidos() {
  const [pedidos, setPedidos] = useState(() =>
    obtenerPedidos().sort((a, b) => b.numero - a.numero),
  )

  function cambiarEstado(numero, estado) {
    const lista = pedidos.map((p) => (p.numero === numero ? { ...p, estado } : p))
    setPedidos(lista)
    guardarPedidos(lista)
  }

  return {
    pedidos,
    cambiarEstado,
  }
}

