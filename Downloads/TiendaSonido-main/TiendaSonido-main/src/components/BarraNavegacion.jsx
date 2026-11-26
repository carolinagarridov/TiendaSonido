import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import { NOMBRE_ROL } from '../data/usuarios'

export default function BarraNavegacion() {
  const { usuario, cerrarSesion, tieneRol } = useAuth()
  const { cantidadItems } = useCarrito()
  const navigate = useNavigate()

  function salir() {
    cerrarSesion()
    navigate('/')
  }

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
            {usuario && (
              <Nav.Link as={NavLink} to="/mis-pedidos">
                Mis pedidos
              </Nav.Link>
            )}
            {tieneRol('admin', 'vendedor') && (
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
                <NavDropdown.Item onClick={salir}>Cerrar sesión</NavDropdown.Item>
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
