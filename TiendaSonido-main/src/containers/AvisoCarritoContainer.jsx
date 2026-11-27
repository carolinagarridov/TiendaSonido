import AvisoCarrito from '../components/molecules/AvisoCarrito/AvisoCarrito'
import { useCarrito } from '../context/CarritoContext'

/**
 * Container para el Toast de aviso de carrito.
 * Conecta el estado global de avisos del carrito con la molécula visual AvisoCarrito.
 */
export default function AvisoCarritoContainer() {
  const { aviso, cerrarAviso } = useCarrito()

  return <AvisoCarrito aviso={aviso} onCerrar={cerrarAviso} />
}

