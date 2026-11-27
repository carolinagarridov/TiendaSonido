import { Alert, Button, Card, Container } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'

/**
 * Página: Vista de error / Compra fallida.
 * Muestra el motivo exacto del fallo manteniendo intacto el carrito del usuario.
 */
export default function CompraFallida() {
  const location = useLocation()
  const motivo = location.state?.motivo || 'Ocurrió un problema inesperado al intentar procesar la transacción.'

  return (
    <Container className="py-5 text-center" style={{ maxWidth: '640px' }}>
      <div className="mb-4">
        <div className="display-4 text-danger mb-2">&#9888;</div>
        <h1 className="h2 fw-bold text-danger">No se pudo procesar tu compra</h1>
        <p className="lead text-muted fs-6">
          La orden no fue completada debido a una incidencia en la validación o disponibilidad del inventario.
        </p>
      </div>

      <Card className="shadow-sm border-0 mb-4 text-start">
        <Card.Body className="p-4">
          <h2 className="h6 fw-bold mb-2">Detalle de la incidencia:</h2>
          <Alert variant="danger" className="mb-3">
            {motivo}
          </Alert>

          <p className="small text-muted mb-0">
            <strong>Tu carrito se mantiene intacto:</strong> No se han eliminado los artículos que seleccionaste, de modo que puedas ajustar cantidades o reintentar el proceso sin perder tus productos.
          </p>
        </Card.Body>
      </Card>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Button as={Link} to="/checkout" variant="warning">
          Reintentar checkout
        </Button>
        <Button as={Link} to="/carrito" variant="outline-secondary">
          Volver al carrito
        </Button>
        <Button as={Link} to="/productos" variant="outline-dark">
          Ir al catálogo
        </Button>
      </div>
    </Container>
  )
}

