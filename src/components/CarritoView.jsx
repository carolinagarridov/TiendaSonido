import { Container, Table, Button, Alert } from 'react-bootstrap';

function CarritoView({ carrito, vaciarCarrito }) {
  const total = carrito.reduce((sum, p) => sum + (p.precio * p.cantidad), 0);

  if (carrito.length === 0) {
    return (
      <Container className="mt-4">
        <Alert variant="info">El carrito está vacío.</Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h2>Mi Carrito de Compras</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Precio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {carrito.map((item, index) => (
            <tr key={index}>
              <td>{item.nombre}</td>
              <td>${item.precio.toLocaleString('es-CL')}</td>
              <td>{item.cantidad}</td>
              <td>${(item.precio * item.cantidad).toLocaleString('es-CL')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between align-items-center mt-3">
        <h4>Total: ${total.toLocaleString('es-CL')}</h4>
        <Button variant="danger" onClick={vaciarCarrito}>Vaciar Carrito</Button>
      </div>
    </Container>
  );
}

export default CarritoView;