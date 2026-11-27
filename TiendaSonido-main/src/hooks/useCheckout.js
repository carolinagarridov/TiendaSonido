import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import {
  guardarPedidos,
  guardarProductos,
  obtenerPedidos,
  obtenerProductos,
} from '../services/almacenamiento'
import { descontarStock } from '../utils/carrito'
import { crearPedido } from '../utils/pedidos'

export const DIRECCION_TIENDA = 'Tienda Sonido Vivo, Viña del Mar'

/**
 * Hook para desacoplar el flujo de compra y checkout de los componentes visuales.
 * Encapsula la validación de dirección, descuento atómico de stock, persistencia del pedido
 * y control de errores sin perder el estado del carrito.
 */
export function useCheckout() {
  const { carrito, vaciar, total } = useCarrito()
  const { usuario } = useAuth()

  const [tipoEntrega, setTipoEntrega] = useState('despacho')
  const [direccion, setDireccion] = useState(() => {
    return usuario ? `${usuario.direccion || ''}, ${usuario.comuna || ''}`.replace(/^,\s*|,\s*$/g, '') : ''
  })
  const [error, setError] = useState('')
  const [procesando, setProcesando] = useState(false)

  function procesarCompra({ onExito, onFallo, onRequiereAuth }) {
    if (!usuario) {
      if (onRequiereAuth) onRequiereAuth()
      return false
    }

    if (carrito.length === 0) {
      setError('El carrito no contiene productos.')
      return false
    }

    if (tipoEntrega === 'despacho' && !direccion.trim()) {
      setError('Ingresa la dirección de despacho.')
      return false
    }

    setProcesando(true)
    setError('')

    try {
      // 1. Verificación y descuento atómico de stock
      const productosActualizados = descontarStock(obtenerProductos(), carrito)
      if (!productosActualizados) {
        setProcesando(false)
        const mensajeFallo = 'Uno o más productos ya no cuentan con stock suficiente en el inventario.'
        setError(mensajeFallo)
        if (onFallo) {
          onFallo(mensajeFallo)
        }
        return false
      }

      // 2. Creación del pedido
      const pedidosExistentes = obtenerPedidos()
      const nuevoPedido = crearPedido({
        carrito,
        usuario,
        pedidosExistentes,
        entrega: {
          tipo: tipoEntrega,
          direccion: tipoEntrega === 'despacho' ? direccion.trim() : DIRECCION_TIENDA,
        },
      })

      // 3. Persistencia
      guardarProductos(productosActualizados)
      guardarPedidos([...pedidosExistentes, nuevoPedido])

      // 4. Vaciar carrito tras confirmación exitosa
      vaciar()
      setProcesando(false)

      if (onExito) {
        onExito(nuevoPedido)
      }
      return true
    } catch (err) {
      setProcesando(false)
      const errorMsg = err?.message || 'Error inesperado durante la transacción.'
      setError(errorMsg)
      if (onFallo) {
        onFallo(errorMsg)
      }
      return false
    }
  }

  return {
    tipoEntrega,
    setTipoEntrega,
    direccion,
    setDireccion,
    error,
    setError,
    procesando,
    total,
    carrito,
    usuario,
    procesarCompra,
  }
}

