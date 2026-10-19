import { useState } from 'react'
import { Alert, Button, Card, Col, Container, Form, ListGroup, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ImagenConRespaldo from '../components/ImagenConRespaldo'
import { useAuth } from '../context/AuthContext'
import { useCarrito } from '../context/CarritoContext'
import {
  guardarPedidos,
  guardarProductos,
  obtenerPedidos,
  obtenerProductos,
} from '../services/almacenamiento'
import { descontarStock } from '../utils/carrito'
import { formatearPrecio } from '../utils/formato'
import { imagenCategoria } from '../utils/imagenes'
import { crearPedido } from '../utils/pedidos'

const DIRECCION_TIENDA = 'Tienda Sonido Vivo, Viña del Mar'

export default function Carrito() {
  const { carrito, cambiarCantidad, quitar, vaciar, total } = useCarrito()
  const { usuario } = useAuth()
  const navigate = useNavigate()
  const [tipoEntrega, setTipoEntrega] = useState('despacho')
  const [direccion, setDireccion] = useState(
    usuario ? `${usuario.direccion}, ${usuario.comuna}` : '',
  )
  const [error, setError] = useState('')

  function confirmarPedido() {
    if (!usuario) {
      navigate('/login', { state: { desde: '/carrito' } })
      return
    }
    if (tipoEntrega === 'despacho' && !direccion.trim()) {
      setError('Ingresa la dirección de despacho.')
      return
    }

    // El stock se descuenta al confirmar (evita vender lo mismo dos veces)
    const productosActualizados = descontarStock(obtenerProductos(), carrito)
    if (!productosActualizados) {
      setError('Uno o más productos ya no tienen stock suficiente. Revisa tu carrito.')
      return
    }

    const pedidos = obtenerPedidos()
    const pedido = crearPedido({
      carrito,
      usuario,
      pedidosExistentes: pedidos,
      entrega: {
        tipo: tipoEntrega,
        direccion: tipoEntrega === 'despacho' ? direccion.trim() : DIRECCION_TIENDA,
      },
    })
    guardarProductos(productosActualizados)
    guardarPedidos([...pedidos, pedido])
    vaciar()
    navigate('/mis-pedidos', { state: { nuevo: pedido.numero } })
  }

  if (carrito.length === 0) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3">Mi carrito de compras</h1>
        <p className="text-muted">El carrito está vacío.</p>
        <Button as={Link} to="/productos" variant="warning">
          Ver productos
        </Button>
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Mi carrito de compras</h1>
      <Row className="g-4">
        <Col lg={8}>
          <ListGroup>
            {carrito.map((item) => (
              <ListGroup.Item key={item.codigo} className="py-3">
                <Row className="align-items-center g-3">
                  <Col xs={3} sm={2}>
                    <ImagenConRespaldo
                      src={item.imagen}
                      respaldo={imagenCategoria(item.categoria)}
                      alt={item.nombre}
                      className="img-fluid rounded miniatura"
                    />
                  </Col>
                  <Col xs={9} sm={5}>
                    <div className="fw-semibold">{item.nombre}</div>
                    <small className="text-muted">{formatearPrecio(item.precio)} c/u</small>
                  </Col>
                  <Col xs={6} sm={3}>
                    <div className="d-flex align-items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        aria-label={`Quitar uno de ${item.nombre}`}
                        onClick={() => cambiarCantidad(item.codigo, item.cantidad - 1)}
                      >
                        −
                      </Button>
                      <span aria-label="cantidad">{item.cantidad}</span>
                      <Button
                        size="sm"
                        variant="outline-secondary"
                        aria-label={`Agregar uno de ${item.nombre}`}
                        disabled={item.cantidad >= item.stock}
                        onClick={() => cambiarCantidad(item.codigo, item.cantidad + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col xs={6} sm={2} className="text-end">
                    <div className="fw-bold">{formatearPrecio(item.precio * item.cantidad)}</div>
                    <Button variant="link" size="sm" className="text-danger p-0" onClick={() => quitar(item.codigo)}>
                      Eliminar
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="outline-danger" className="mt-3" onClick={vaciar}>
            Vaciar carrito
          </Button>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <h2 className="h5">Resumen del pedido</h2>
              <Form.Group className="my-3">
                <Form.Label className="fw-semibold">Entrega</Form.Label>
                <Form.Check
                  type="radio"
                  id="entrega-despacho"
                  name="entrega"
                  label="Despacho a domicilio"
                  checked={tipoEntrega === 'despacho'}
                  onChange={() => setTipoEntrega('despacho')}
                />
                <Form.Check
                  type="radio"
                  id="entrega-retiro"
                  name="entrega"
                  label="Retiro en tienda (Viña del Mar)"
                  checked={tipoEntrega === 'retiro'}
                  onChange={() => setTipoEntrega('retiro')}
                />
              </Form.Group>
              {tipoEntrega === 'despacho' && (
                <Form.Group className="mb-3" controlId="direccion-despacho">
                  <Form.Label>Dirección de despacho</Form.Label>
                  <Form.Control value={direccion} onChange={(e) => setDireccion(e.target.value)} />
                </Form.Group>
              )}
              <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
                <span>Total</span>
                <span data-testid="total-carrito">{formatearPrecio(total)}</span>
              </div>
              {error && (
                <Alert variant="danger" className="mt-3 mb-0">
                  {error}
                </Alert>
              )}
              <Button variant="success" className="w-100 mt-3" onClick={confirmarPedido}>
                {usuario ? 'Confirmar pedido' : 'Inicia sesión para comprar'}
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
