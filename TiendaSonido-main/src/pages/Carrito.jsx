import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ListaCarrito from '../components/organisms/ListaCarrito/ListaCarrito'
import { useCarrito } from '../context/CarritoContext'
import { formatearPrecio } from '../utils/formato'

/**
 * Página: Carrito de compras.
 * Presenta la lista de productos agregados, control de cantidades y acceso directo al Checkout.
 */
export default function Carrito() {
  const { carrito, cambiarCantidad, quitar, vaciar, total, cantidadItems } = useCarrito()

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 mb-3">Mi carrito de compras</h1>
        <p className="text-muted mb-4">El carrito está vacío.</p>
        <Button as={Link} to="/productos" variant="warning">
          Ver productos
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <h1 className="h3 mb-0">Mi carrito de compras</h1>
        <span className="text-muted small">
          {cantidadItems} producto{cantidadItems === 1 ? '' : 's'} en el carrito
        </span>
      </div>

      <Row className="g-4">
        <Col lg={8}>
          <ListaCarrito
            items={carrito}
            onCambiarCantidad={cambiarCantidad}
            onQuitar={quitar}
            onVaciar={vaciar}
          />
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5 mb-3">Resumen de compra</h2>
              <div className="d-flex justify-content-between small text-muted mb-2">
                <span>Subtotal ({cantidadItems} artículos)</span>
                <span>{formatearPrecio(total)}</span>
              </div>
              <div className="d-flex justify-content-between small text-muted mb-3">
                <span>Despacho</span>
                <span>Calculado en checkout</span>
              </div>
              <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                <span>Total estimado</span>
                <span data-testid="total-carrito" className="text-primary">{formatearPrecio(total)}</span>
              </div>

              <Button as={Link} to="/checkout" variant="success" size="lg" className="w-100 mt-4">
                Proceder al checkout &rarr;
              </Button>

              <Button as={Link} to="/productos" variant="outline-secondary" className="w-100 mt-2">
                Seguir comprando
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
