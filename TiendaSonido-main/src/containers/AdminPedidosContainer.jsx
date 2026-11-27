import AdminPedidos from '../components/organisms/AdminPedidos/AdminPedidos'
import { useAdminPedidos } from '../hooks/useAdminPedidos'

/**
 * Container para la gestión de pedidos en el panel de administración.
 * Conecta el hook useAdminPedidos con el organismo presentacional AdminPedidos.
 */
export default function AdminPedidosContainer() {
  const { pedidos, cambiarEstado } = useAdminPedidos()

  return <AdminPedidos pedidos={pedidos} onCambiarEstado={cambiarEstado} />
}

