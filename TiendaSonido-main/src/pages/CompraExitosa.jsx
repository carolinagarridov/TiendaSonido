import { Alert, Badge, Button, Card, Col, Container, Row, Table } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { formatearPrecio } from '../utils/formato'
import { COLOR_ESTADO } from '../utils/pedidos'

/**
 * Página: Confirmación de compra exitosa.
 * Muestra el número de pedido generado, detalle de productos, costo y dirección de entrega.
 */
export default function CompraExitosa() {
  const location = useLocation()
  const pedido = location.state?.pedido

  if (!pedido) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 mb-3">Confirmación de compra</h1>
        <p className="text-muted mb-4">
          No hay información de un pedido reciente en esta sesión. Puedes revisar tus pedidos confirmados en tu cuenta.
        </p>
        <div className="d-flex justify-content-center gap-3">
          <Button as={Link} to="/mis-pedidos" variant="primary">
            Ver mis pedidos
          </Button>
          <Button as={Link} to="/productos" variant="outline-secondary">
            Ir al catálogo
          </Button>
        </div>
      </Container>
    )
  }

  return (
    <Container className="py-5" style={{ maxWidth: '780px' }}>
      <div className="text-center mb-4">
        <div className="display-4 text-success mb-2">&#10004;</div>
        <h1 className="h2 fw-bold text-success">¡Gracias por tu compra!</h1>
        <p className="lead text-muted fs-6">
          Tu pedido ha sido procesado correctamente y ya se encuentra en nuestro sistema.
        </p>
      </div>

      <Card className="shadow-sm border-0 mb-4">
        <Card.Header className="bg-dark text-white d-flex justify-content-between align-items-center py-3">
          <span className="fw-bold fs-5">Pedido #{pedido.numero}</span>
          <Badge bg={COLOR_ESTADO[pedido.estado] || 'warning'}>{pedido.estado}</Badge>
        </Card.Header>
        <Card.Body className="p-4">
          <Row className="mb-4">
            <Col sm={6}>
              <h2 className="h6 text-muted mb-1">Cliente</h2>
              <p className="fw-semibold mb-0">{pedido.cliente?.nombre}</p>
              <p className="small text-muted mb-0">{pedido.cliente?.correo}</p>
            </Col>
            <Col sm={6} className="mt-3 mt-sm-0">
              <h2 className="h6 text-muted mb-1">Método de entrega</h2>
              <p className="fw-semibold mb-0">
                {pedido.entrega?.tipo === 'despacho' ? 'Despacho a domicilio' : 'Retiro en tienda'}
              </p>
              <p className="small text-muted mb-0">{pedido.entrega?.direccion}</p>
            </Col>
          </Row>

          <h2 className="h6 text-muted mb-2">Detalle de productos</h2>
          <Table responsive size="sm" className="align-middle mb-3">
            <thead className="table-light">
              <tr>
                <th>Producto</th>
                <th className="text-center">Cant.</th>
                <th className="text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {pedido.items?.map((item) => (
                <tr key={item.codigo}>
                  <td>{item.nombre}</td>
                  <td className="text-center">{item.cantidad}</td>
                  <td className="text-end">{formatearPrecio(item.precio * item.cantidad)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="text-end fw-bold fs-6">
                  Total pagado:
                </td>
                <td className="text-end fw-bold fs-6 text-success">
                  {formatearPrecio(pedido.total)}
                </td>
              </tr>
            </tfoot>
          </Table>

          <Alert variant="info" className="small mb-0">
            Recibirás notificaciones a tu correo ante cualquier cambio en el estado de despacho de tu pedido.
          </Alert>
        </Card.Body>
      </Card>

      <div className="d-flex flex-wrap justify-content-center gap-3">
        <Button as={Link} to="/mis-pedidos" variant="primary">
          Ver todos mis pedidos
        </Button>
        <Button as={Link} to="/productos" variant="outline-dark">
          Seguir comprando
        </Button>
      </div>
    </Container>
  )
}

