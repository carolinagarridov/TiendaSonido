import { useNavigate } from 'react-router-dom'
import BarraNavegacion from '../components/organisms/BarraNavegacion/BarraNavegacion'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'

/**
 * Container para la Barra de Navegación.
 * Obtiene los datos de sesión y carrito de los contextos globales y gestiona el flujo de navegación.
 */
export default function BarraNavegacionContainer() {
  const { usuario, cerrarSesion } = useAuth()
  const { cantidadItems } = useCarrito()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <BarraNavegacion
      usuario={usuario}
      cantidadItems={cantidadItems}
      onCerrarSesion={salir}
    />
  )
}

