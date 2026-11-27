import { Col, Row } from 'react-bootstrap'
import TarjetaProducto from '../../molecules/TarjetaProducto/TarjetaProducto'

/**
 * Organismo: Grilla responsiva de tarjetas de productos.
 *
 * @param {object} props
 * @param {Array} props.productos - Lista de productos a mostrar.
 * @param {Function} props.onAgregar - Callback al añadir un producto al carrito.
 * @param {string} [props.mensajeVacio] - Mensaje a mostrar si no hay productos.
 */
export default function GrillaProductos({
  productos = [],
  onAgregar,
  mensajeVacio = 'No hay productos que coincidan con tu búsqueda.',
}) {
  if (productos.length === 0) {
    return <p className="text-muted">{mensajeVacio}</p>
  }

  return (
    <Row xs={1} sm={2} md={3} xl={4} className="g-4">
      {productos.map((p) => (
        <Col key={p.codigo}>
          <TarjetaProducto producto={p} onAgregar={onAgregar} />
        </Col>
      ))}
    </Row>
  )
}

