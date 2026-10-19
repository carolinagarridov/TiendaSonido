import { Badge, Button, Card } from 'react-bootstrap'
import { formatearPrecio } from '../utils/formato'
import { imagenCategoria } from '../utils/imagenes'
import ImagenConRespaldo from './ImagenConRespaldo'

export default function TarjetaProducto({ producto, onAgregar }) {
  const agotado = producto.stock <= 0

  return (
    <Card className="h-100 tarjeta-producto shadow-sm">
      <div className="contenedor-imagen">
        <ImagenConRespaldo
          src={producto.imagen}
          respaldo={imagenCategoria(producto.categoria)}
          alt={producto.nombre}
          className="card-img-top"
          loading="lazy"
        />
        <Badge bg="dark" className="codigo-producto">
          {producto.codigo}
        </Badge>
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Subtitle className="mb-1 small text-muted">{producto.categoria}</Card.Subtitle>
        <Card.Title as="h3" className="fs-6 fw-bold">
          {producto.nombre}
        </Card.Title>
        <Card.Text className="small mb-1">
          <strong>{producto.marca}</strong> · {producto.modelo}
        </Card.Text>
        <Card.Text className="small text-secondary flex-grow-1">{producto.descripcion}</Card.Text>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="fs-5 fw-bold precio">{formatearPrecio(producto.precio)}</span>
          {agotado ? (
            <Badge bg="danger">Agotado</Badge>
          ) : (
            <Badge bg={producto.stock <= 2 ? 'warning' : 'success'} text={producto.stock <= 2 ? 'dark' : undefined}>
              Stock: {producto.stock}
            </Badge>
          )}
        </div>
        <Button variant="success" disabled={agotado} onClick={() => onAgregar(producto)}>
          {agotado ? 'Sin stock' : 'Añadir al carrito'}
        </Button>
      </Card.Body>
    </Card>
  )
}
