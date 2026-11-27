import { useNavigate } from 'react-router-dom'
import AdminLayout from '../../components/templates/AdminLayout'
import AdminPedidosContainer from '../../containers/AdminPedidosContainer'
import AdminProductosContainer from '../../containers/AdminProductosContainer'
import AdminUsuariosContainer from '../../containers/AdminUsuariosContainer'
import { useAuth } from '../../context/AuthContext'
import { NOMBRE_ROL } from '../../data/usuarios'

/**
 * Página de administración (Container de página).
 *
 * Responsabilidad: Obtener autenticación y permisos desde AuthContext,
 * coordinar el cierre de sesión y proveer los contenedores correspondientes
 * al template presentacional AdminLayout.
 */
export default function Admin() {
  const { usuario, tieneRol, cerrarSesion } = useAuth()
  const navigate = useNavigate()

  const esAdmin = tieneRol('admin')
  const rolLabel = NOMBRE_ROL[usuario?.rol] || 'Usuario'

  function salir() {
    cerrarSesion()
    navigate('/')
  }

  return (
    <AdminLayout
      rolLabel={rolLabel}
      esAdmin={esAdmin}
      onCerrarSesion={salir}
      tabPedidos={<AdminPedidosContainer />}
      tabProductos={<AdminProductosContainer puedeEditarCatalogo={esAdmin} />}
      tabUsuarios={<AdminUsuariosContainer />}
    />
  )
}
