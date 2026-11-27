import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { NOMBRE_ROL } from '../../../data/usuarios'

/**
 * Organismo presentacional: Barra de navegación principal.
 *
 * Recibe el estado de sesión y del carrito por props, sin acoplarse directamente a contextos globales.
 *
 * @param {object} props
 * @param {object|null} props.usuario - Usuario autenticado o null.
 * @param {number} [props.cantidadItems=0] - Cantidad de productos en el carrito.
 * @param {Function} props.onCerrarSesion - Callback al hacer clic en cerrar sesión.
 */
export default function BarraNavegacion({
  usuario,
  cantidadItems = 0,
  onCerrarSesion,
}) {
  const tieneRolAdminOVendedor =
    usuario && (usuario.rol === 'admin' || usuario.rol === 'vendedor')

  return (
    // expand="lg": en móvil y tableta el menú se colapsa en hamburguesa (requisito 0.3)
    <Navbar expand="lg" variant="dark" className="barra-principal" collapseOnSelect sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Sonido <span className="text-acento">Vivo</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="menu-principal" />
        <Navbar.Collapse id="menu-principal">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              Inicio
            </Nav.Link>
            <Nav.Link as={NavLink} to="/productos">
              Productos
            </Nav.Link>
            <Nav.Link as={NavLink} to="/categorias">
              Categorías
            </Nav.Link>
            <Nav.Link as={NavLink} to="/ofertas">
              Ofertas
            </Nav.Link>
            {usuario && (
              <Nav.Link as={NavLink} to="/mis-pedidos">
                Mis pedidos
              </Nav.Link>
            )}
            {tieneRolAdminOVendedor && (
              <Nav.Link as={NavLink} to="/admin">
                Administración
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-lg-center gap-lg-2">
            {usuario ? (
              <NavDropdown title={`Hola, ${usuario.nombre}`} id="menu-usuario" align="end">
                <NavDropdown.ItemText className="small text-muted">
                  {usuario.correo}
                  <br />
                  Rol: {NOMBRE_ROL[usuario.rol]}
                </NavDropdown.ItemText>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={onCerrarSesion}>Cerrar sesión</NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">
                  Iniciar sesión
                </Nav.Link>
                <Nav.Link as={NavLink} to="/registro">
                  Registrarse
                </Nav.Link>
              </>
            )}
            <Nav.Link as={NavLink} to="/carrito" className="boton-carrito">
              Carrito{' '}
              <Badge bg="dark" pill data-testid="contador-carrito">
                {cantidadItems}
              </Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
