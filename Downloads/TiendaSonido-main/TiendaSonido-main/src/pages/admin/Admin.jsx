import { Container, Tab, Tabs } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { NOMBRE_ROL } from '../../data/usuarios'
import AdminPedidos from './AdminPedidos'
import AdminProductos from './AdminProductos'
import AdminUsuarios from './AdminUsuarios'

// Admin ve todo. Vendedor ve productos (solo stock) y pedidos, pero NO usuarios.
export default function Admin() {
  const { usuario, tieneRol } = useAuth()
  const esAdmin = tieneRol('admin')

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">Panel de administración</h1>
        <span className="text-muted small">Sesión: {NOMBRE_ROL[usuario.rol]}</span>
      </div>
      <Tabs defaultActiveKey="pedidos" className="mb-4" mountOnEnter>
        <Tab eventKey="pedidos" title="Pedidos">
          <AdminPedidos />
        </Tab>
        <Tab eventKey="productos" title="Productos">
          <AdminProductos puedeEditarCatalogo={esAdmin} />
        </Tab>
        {esAdmin && (
          <Tab eventKey="usuarios" title="Usuarios">
            <AdminUsuarios />
          </Tab>
        )}
      </Tabs>
    </Container>
  )
}
