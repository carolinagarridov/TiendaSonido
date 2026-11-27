import { Button, Container, Nav, Navbar, Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/**
 * Template del panel de administración.
 *
 * Responsabilidad: Definir la estructura visual y maquetación de la administración
 * (barra de navegación administrativa, encabezado con rol y panel de pestañas).
 *
 * Es un componente presentacional puro: recibe el contenido de las pestañas
 * y los datos de sesión mediante props, sin importar containers directamente.
 *
 * @param {object} props
 * @param {string} props.rolLabel - Nombre legible del rol en sesión.
 * @param {boolean} props.esAdmin - Booleano para determinar si se habilita la pestaña de usuarios.
 * @param {React.ReactNode} props.tabPedidos - Contenido para la pestaña de pedidos.
 * @param {React.ReactNode} props.tabProductos - Contenido para la pestaña de inventario.
 * @param {React.ReactNode} [props.tabUsuarios] - Contenido para la pestaña de usuarios (si es admin).
 * @param {Function} [props.onCerrarSesion] - Callback opcional para cerrar sesión.
 */
export default function AdminLayout({
  rolLabel,
  esAdmin,
  tabPedidos,
  tabProductos,
  tabUsuarios,
  onCerrarSesion,
}) {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar bg="dark" variant="dark" expand="md" className="border-bottom border-secondary">
        <Container>
          <Navbar.Brand as={Link} to="/admin" className="fw-bold">
            Sonido <span className="text-warning">Vivo</span> · Admin
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="admin-navbar-nav" />
          <Navbar.Collapse id="admin-navbar-nav">
            <Nav className="ms-auto align-items-md-center gap-2">
              <span className="badge bg-secondary me-2">Rol: {rolLabel}</span>
              <Nav.Link as={Link} to="/" className="text-light">
                &larr; Volver a la tienda
              </Nav.Link>
              {onCerrarSesion && (
                <Button variant="outline-light" size="sm" onClick={onCerrarSesion}>
                  Cerrar sesión
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="py-4 flex-grow-1">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h1 className="h3 mb-0">Panel de administración</h1>
            <small className="text-muted">Gestión integral de pedidos, inventario y usuarios</small>
          </div>
          <span className="text-muted small">Sesión activa como: <strong>{rolLabel}</strong></span>
        </div>

        <Tabs defaultActiveKey="pedidos" className="mb-4" mountOnEnter>
          <Tab eventKey="pedidos" title="Pedidos">
            {tabPedidos}
          </Tab>
          <Tab eventKey="productos" title="Productos">
            {tabProductos}
          </Tab>
          {esAdmin && (
            <Tab eventKey="usuarios" title="Usuarios">
              {tabUsuarios}
            </Tab>
          )}
        </Tabs>
      </Container>

      <footer className="py-3 bg-dark text-white-50 text-center small mt-auto">
        <Container>
          &copy; 2026 Sonido Vivo — Panel Administrativo
        </Container>
      </footer>
    </div>
  )
}
