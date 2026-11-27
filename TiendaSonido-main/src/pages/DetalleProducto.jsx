import { useState } from 'react'
import { Badge, Breadcrumb, Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import ImagenConRespaldo from '../components/atoms/ImagenConRespaldo/ImagenConRespaldo'
import { useCarrito } from '../context/CarritoContext'
import { obtenerProductos } from '../services/almacenamiento'
import { formatearPrecio } from '../utils/formato'
import { imagenCategoria } from '../utils/imagenes'

/**
 * Página: Vista de detalle individual de producto.
 * Muestra información exhaustiva de un producto específico, stock disponible
 * y permite agregarlo directamente al carrito.
 */
export default function DetalleProducto() {
  const { codigo } = useParams()
  const { agregar } = useCarrito()
  const [cantidad, setCantidad] = useState(1)

  const productos = obtenerProductos()
  const producto = productos.find(
    (p) => p.codigo.toUpperCase() === (codigo || '').trim().toUpperCase(),
  )

  if (!producto) {
    return (
      <Container className="py-5 text-center">
        <h1 className="h3 mb-3">Producto no encontrado</h1>
        <p className="text-muted mb-4">
          El producto con código <code>{codigo}</code> no existe en nuestro catálogo o fue dado de baja.
        </p>
        <Button as={Link} to="/productos" variant="warning">
          &larr; Volver al catálogo
        </Button>
      </Container>
    )
  }

  const agotado = producto.stock <= 0

  function handleAgregar() {
    for (let i = 0; i < cantidad; i++) {
      agregar(producto)
    }
  }

  return (
    <Container className="py-4">
      <Breadcrumb className="mb-4">
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/' }}>
          Inicio
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: '/productos' }}>
          Productos
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: `/productos?categoria=${encodeURIComponent(producto.categoria)}` }}>
          {producto.categoria}
        </Breadcrumb.Item>
        <Breadcrumb.Item active>{producto.nombre}</Breadcrumb.Item>
      </Breadcrumb>

      <Row className="g-5 align-items-start">
        <Col md={6}>
          <div className="bg-white p-3 rounded-3 shadow-sm border text-center">
            <ImagenConRespaldo
              src={producto.imagen}
              respaldo={imagenCategoria(producto.categoria)}
              alt={producto.nombre}
              className="img-fluid rounded"
              style={{ maxHeight: '420px', objectFit: 'contain' }}
            />
          </div>
        </Col>

        <Col md={6}>
          <div className="d-flex align-items-center gap-2 mb-2">
            <Badge bg="secondary">{producto.categoria}</Badge>
            <Badge bg="dark">Código: {producto.codigo}</Badge>
          </div>

          <h1 className="h2 fw-bold mb-2">{producto.nombre}</h1>

          <p className="text-muted mb-3">
            Marca: <strong>{producto.marca}</strong> · Modelo: <strong>{producto.modelo}</strong>
          </p>

          <div className="d-flex align-items-baseline gap-3 mb-3">
            <span className="display-6 fw-bold text-primary">{formatearPrecio(producto.precio)}</span>
            {agotado ? (
              <Badge bg="danger" className="fs-6">Agotado</Badge>
            ) : (
              <Badge
                bg={producto.stock <= 2 ? 'warning' : 'success'}
                text={producto.stock <= 2 ? 'dark' : undefined}
                className="fs-6"
              >
                Stock disponible: {producto.stock}
              </Badge>
            )}
          </div>

          <p className="lead fs-6 text-secondary mb-4">{producto.descripcion}</p>

          <Card className="bg-light border-0 mb-4">
            <Card.Body>
              <h2 className="h6 fw-bold mb-3">Opciones de compra</h2>
              {!agotado ? (
                <div className="d-flex flex-wrap align-items-center gap-3">
                  <Form.Group className="d-flex align-items-center gap-2">
                    <Form.Label htmlFor="cantidad-detalle" className="mb-0 small fw-semibold">
                      Cantidad:
                    </Form.Label>
                    <Form.Select
                      id="cantidad-detalle"
                      size="sm"
                      style={{ width: '80px' }}
                      value={cantidad}
                      onChange={(e) => setCantidad(Number(e.target.value))}
                    >
                      {Array.from({ length: Math.min(producto.stock, 10) }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>

                  <Button variant="success" size="lg" onClick={handleAgregar}>
                    Añadir al carrito
                  </Button>

                  <Button as={Link} to="/carrito" variant="outline-dark" size="lg">
                    Ir al carrito
                  </Button>
                </div>
              ) : (
                <div>
                  <p className="text-danger mb-2 fw-semibold">
                    Este producto no tiene unidades disponibles en este momento.
                  </p>
                  <Button as={Link} to="/productos" variant="outline-secondary">
                    Explorar otros productos
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>

          <div className="small text-muted border-top pt-3">
            <p className="mb-1">&bull; Despacho a todo Chile continental.</p>
            <p className="mb-0">&bull; Retiro en tienda presencial sin costo adicional (Viña del Mar).</p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

