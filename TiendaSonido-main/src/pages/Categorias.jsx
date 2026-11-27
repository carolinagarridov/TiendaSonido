import { useMemo } from 'react'
import { Badge, Button, Card, Col, Container, Row } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import GrillaProductos from '../components/organisms/GrillaProductos/GrillaProductos'
import { useCarrito } from '../context/CarritoContext'
import { CATEGORIAS } from '../data/productos'
import { obtenerProductos } from '../services/almacenamiento'
import { formatearPrecio } from '../utils/formato'
import { imagenCategoria, rutaPublica } from '../utils/imagenes'

/**
 * Página: Vista para explorar categorías del catálogo.
 * Permite ver la grilla de categorías con estadísticas o ver productos de una categoría específica.
 */
export default function Categorias() {
  const { categoria: categoriaParam } = useParams()
  const { agregar } = useCarrito()
  const productos = useMemo(() => obtenerProductos(), [])

  // Si hay un parámetro de categoría en la URL
  const categoriaSeleccionada = categoriaParam ? decodeURIComponent(categoriaParam) : null

  const productosDeCategoria = useMemo(() => {
    if (!categoriaSeleccionada) return []
    return productos.filter(
      (p) => p.categoria.toLowerCase() === categoriaSeleccionada.toLowerCase(),
    )
  }, [productos, categoriaSeleccionada])

  // Estadísticas por categoría
  const statsCategorias = useMemo(() => {
    return CATEGORIAS.map((cat) => {
      const prods = productos.filter((p) => p.categoria === cat)
      const stockTotal = prods.reduce((sum, p) => sum + p.stock, 0)
      const precios = prods.map((p) => p.precio)
      const precioMin = precios.length > 0 ? Math.min(...precios) : 0
      const precioMax = precios.length > 0 ? Math.max(...precios) : 0
      return {
        nombre: cat,
        cantidad: prods.length,
        stockTotal,
        precioMin,
        precioMax,
        icono: imagenCategoria(cat),
      }
    })
  }, [productos])

  if (categoriaSeleccionada) {
    return (
      <Container className="py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
          <div>
            <h1 className="h3 mb-0">{categoriaSeleccionada}</h1>
            <small className="text-muted">
              {productosDeCategoria.length} producto{productosDeCategoria.length === 1 ? '' : 's'} en esta categoría
            </small>
          </div>
          <Button as={Link} to="/categorias" variant="outline-secondary">
            &larr; Todas las categorías
          </Button>
        </div>

        <GrillaProductos
          productos={productosDeCategoria}
          onAgregar={agregar}
          mensajeVacio={`No se encontraron productos en la categoría "${categoriaSeleccionada}".`}
        />
      </Container>
    )
  }

  return (
    <Container className="py-4">
      <div className="text-center mb-5">
        <h1 className="h2 fw-bold">Explora por Categorías</h1>
        <p className="text-muted lead fs-6">
          Encuentra exactamente lo que necesitas organizado por familia de instrumentos y audio
        </p>
      </div>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {statsCategorias.map((cat) => (
          <Col key={cat.nombre}>
            <Card className="h-100 shadow-sm border-0 text-center hover-card">
              <Card.Body className="d-flex flex-column align-items-center p-4">
                <div
                  className="rounded-circle bg-light d-flex align-items-center justify-content-center mb-3 shadow-sm"
                  style={{ width: '80px', height: '80px' }}
                >
                  <img
                    src={rutaPublica(cat.icono)}
                    alt={cat.nombre}
                    style={{ width: '48px', height: '48px' }}
                  />
                </div>

                <Card.Title as="h2" className="h5 fw-bold mb-2">
                  {cat.nombre}
                </Card.Title>

                <div className="mb-3">
                  <Badge bg="primary" className="me-1">
                    {cat.cantidad} modelos
                  </Badge>
                  <Badge bg={cat.stockTotal > 0 ? 'success' : 'danger'}>
                    {cat.stockTotal > 0 ? `${cat.stockTotal} en stock` : 'Sin stock'}
                  </Badge>
                </div>

                {cat.cantidad > 0 && (
                  <p className="small text-muted mb-4 flex-grow-1">
                    Desde {formatearPrecio(cat.precioMin)} hasta {formatearPrecio(cat.precioMax)}
                  </p>
                )}

                <Button
                  as={Link}
                  to={`/productos?categoria=${encodeURIComponent(cat.nombre)}`}
                  variant="outline-primary"
                  className="w-100 mt-auto"
                >
                  Ver productos
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

