import { useMemo } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ImagenConRespaldo from '../components/ImagenConRespaldo'
import TarjetaProducto from '../components/TarjetaProducto'
import { useCarrito } from '../context/CarritoContext'
import { obtenerProductos } from '../services/almacenamiento'

export default function Inicio() {
  const { agregar } = useCarrito()

  // Destacados: el primer producto con stock de cada categoría (máximo 8)
  const destacados = useMemo(() => {
    const vistos = new Set()
    return obtenerProductos()
      .filter((p) => p.stock > 0 && !vistos.has(p.categoria) && vistos.add(p.categoria))
      .slice(0, 8)
  }, [])

  return (
    <>
      <section className="hero py-5">
        <Container>
          <Row className="align-items-center gy-4">
            <Col lg={6}>
              <p className="text-acento fw-semibold mb-2">Viña del Mar · desde 2015</p>
              <h1 className="display-5 fw-bold">Tienda online Sonido Vivo</h1>
              <p className="lead">
                Especialistas en guitarras, bajos, baterías y equipamiento de audio profesional. Revisa
                stock y precios actualizados, y compra desde cualquier ciudad.
              </p>
              <Button as={Link} to="/productos" variant="warning" size="lg">
                Ver productos
              </Button>
            </Col>
            <Col lg={6}>
              <ImagenConRespaldo
                src="img/hero-banner.jpg"
                respaldo="img/hero-banner.svg"
                alt="Instrumentos musicales Sonido Vivo"
                className="img-fluid rounded-3 shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <Container className="py-5">
        <h2 className="h3 mb-4">Productos destacados</h2>
        <Row xs={1} sm={2} md={3} xl={4} className="g-4">
          {destacados.map((p) => (
            <Col key={p.codigo}>
              <TarjetaProducto producto={p} onAgregar={agregar} />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  )
}
