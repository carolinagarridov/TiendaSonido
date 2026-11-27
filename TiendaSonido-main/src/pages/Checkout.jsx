import { Alert, Badge, Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useCheckout } from '../hooks/useCheckout'
import { formatearPrecio } from '../utils/formato'

/**
 * Página: Vista de Checkout para completar la compra.
 * Reutiliza las validaciones y lógica de entrega desacopladas a través de useCheckout.
 */
export default function Checkout() {
  const navigate = useNavigate()
  const {
    tipoEntrega,
    setTipoEntrega,
    direccion,
    setDireccion,
    error,
    procesando,
    total,
    carrito,
    usuario,
    procesarCompra,
  } = useCheckout()

  function handleConfirmar() {
    procesarCompra({
      onRequiereAuth: () => navigate('/login', { state: { desde: '/checkout' } }),
      onFallo: (motivo) => navigate('/compra-fallida', { state: { motivo } }),
      onExito: (pedido) => navigate('/compra-exitosa', { state: { pedido } }),
    })
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 mb-3">Tu carrito está vacío</h1>
        <p className="text-muted mb-4">
          No hay productos seleccionados para procesar un pedido.
        </p>
        <Button as={Link} to="/productos" variant="warning">
          Ver productos
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="mb-4 pb-2 border-bottom">
        <h1 className="h3 mb-0">Finalizar Compra</h1>
        <small className="text-muted">Revisa tus datos y confirma el pedido</small>
      </div>

      <Row className="g-4">
        <Col lg={7}>
          {/* Identificación del cliente */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h2 className="h5 mb-3">1. Datos del cliente</h2>
              {usuario ? (
                <div>
                  <p className="mb-1">
                    Comprando como: <strong>{usuario.nombre} {usuario.apellidos || ''}</strong>
                  </p>
                  <p className="text-muted small mb-0">
                    Correo de notificación: <code>{usuario.correo}</code>
                  </p>
                </div>
              ) : (
                <div className="p-3 bg-light rounded text-center">
                  <p className="mb-2">Debes iniciar sesión para completar la compra a tu nombre.</p>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => navigate('/login', { state: { desde: '/checkout' } })}
                  >
                    Iniciar sesión ahora
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          {/* Método de Entrega */}
          <Card className="shadow-sm mb-4">
            <Card.Body>
              <h2 className="h5 mb-3">2. Método de entrega</h2>
              <Form.Group className="mb-3">
                <Form.Check
                  type="radio"
                  id="checkout-despacho"
                  name="tipoEntrega"
                  label="Despacho a domicilio"
                  checked={tipoEntrega === 'despacho'}
                  onChange={() => setTipoEntrega('despacho')}
                  className="mb-2"
                />
                <Form.Check
                  type="radio"
                  id="checkout-retiro"
                  name="tipoEntrega"
                  label="Retiro en tienda (Viña del Mar - Gratis)"
                  checked={tipoEntrega === 'retiro'}
                  onChange={() => setTipoEntrega('retiro')}
                />
              </Form.Group>

              {tipoEntrega === 'despacho' && (
                <Form.Group controlId="checkout-direccion">
                  <Form.Label className="fw-semibold">Dirección de entrega</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ej: Calle Los Alerces 1234, Viña del Mar"
                    value={direccion}
                    onChange={(e) => setDireccion(e.target.value)}
                    required
                  />
                  <Form.Text muted>Asegúrate de incluir calle, número y comuna.</Form.Text>
                </Form.Group>
              )}
            </Card.Body>
          </Card>

          {/* Forma de pago */}
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5 mb-2">3. Forma de pago</h2>
              <p className="text-muted small mb-0">
                Transacción simulada en entorno de desarrollo. No se solicitarán datos de tarjeta de crédito reales.
              </p>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={5}>
          {/* Resumen del pedido */}
          <Card className="shadow-sm sticky-top" style={{ top: '80px' }}>
            <Card.Body>
              <h2 className="h5 mb-3">Resumen del pedido</h2>
              <ListGroup variant="flush" className="mb-3">
                {carrito.map((item) => (
                  <ListGroup.Item key={item.codigo} className="px-0 py-2 d-flex justify-content-between align-items-center">
                    <div>
                      <div className="fw-semibold small">{item.nombre}</div>
                      <small className="text-muted">
                        {item.cantidad} x {formatearPrecio(item.precio)}
                      </small>
                    </div>
                    <span className="fw-bold small">{formatearPrecio(item.precio * item.cantidad)}</span>
                  </ListGroup.Item>
                ))}
              </ListGroup>

              <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                <span>Total a pagar</span>
                <span className="text-primary">{formatearPrecio(total)}</span>
              </div>

              {error && (
                <Alert variant="danger" className="mt-3 mb-0">
                  {error}
                </Alert>
              )}

              <Button
                variant="success"
                size="lg"
                className="w-100 mt-4"
                disabled={procesando}
                onClick={handleConfirmar}
              >
                {procesando
                  ? 'Procesando...'
                  : usuario
                  ? 'Confirmar pedido'
                  : 'Inicia sesión para comprar'}
              </Button>

              <div className="text-center mt-3">
                <Link to="/carrito" className="small text-muted text-decoration-none">
                  &larr; Volver al carrito para modificar productos
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

