import { Button, Col, ListGroup, Row } from 'react-bootstrap'
import { formatearPrecio } from '../../../utils/formato'
import { imagenCategoria } from '../../../utils/imagenes'
import ImagenConRespaldo from '../../atoms/ImagenConRespaldo/ImagenConRespaldo'

/**
 * Molécula: Fila de un producto en el carrito de compras.
 *
 * @param {object} props
 * @param {object} props.item
 * @param {Function} props.onCambiarCantidad - (codigo, nuevaCantidad) => void
 * @param {Function} props.onQuitar - (codigo) => void
 */
export default function ItemCarrito({ item, onCambiarCantidad, onQuitar }) {
  return (
    <ListGroup.Item className="py-3">
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
              onClick={() => onCambiarCantidad(item.codigo, item.cantidad - 1)}
            >
              −
            </Button>
            <span aria-label="cantidad">{item.cantidad}</span>
            <Button
              size="sm"
              variant="outline-secondary"
              aria-label={`Agregar uno de ${item.nombre}`}
              disabled={item.cantidad >= item.stock}
              onClick={() => onCambiarCantidad(item.codigo, item.cantidad + 1)}
            >
              +
            </Button>
          </div>
        </Col>
        <Col xs={6} sm={2} className="text-end">
          <div className="fw-bold">{formatearPrecio(item.precio * item.cantidad)}</div>
          <Button
            variant="link"
            size="sm"
            className="text-danger p-0"
            onClick={() => onQuitar(item.codigo)}
          >
            Eliminar
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  )
}

