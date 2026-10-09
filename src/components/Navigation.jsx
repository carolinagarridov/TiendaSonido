import { Navbar, Nav, Container, Badge } from 'react-bootstrap';

function Navigation({ cartCount, setVista }) {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="mb-4">
      <Container>
        <Navbar.Brand href="#" onClick={() => setVista('tienda')}>Sonido Vivo</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => setVista('tienda')}>Catálogo</Nav.Link>
            <Nav.Link onClick={() => setVista('admin')}>Administración</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => setVista('carrito')}>
              Carrito <Badge bg="warning" text="dark">{cartCount}</Badge>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;