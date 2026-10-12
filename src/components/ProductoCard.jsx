import { Card, Button, Badge, Col } from 'react-bootstrap';

function ProductoCard({ producto, agregarAlCarrito }) {
  return (
    /* Aplicamos la combinación de breakpoints recomendada por la PPT */
    <Col xs={12} md={6} lg={4} className="mb-4">
      <Card className="h-100 shadow-sm">
        {/* Si agregas imágenes de producto, asegúrate de usar la prop fluid de React Bootstrap */}
        {producto.imagen && (
          <Card.Img 
            variant="top" 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="img-fluid" 
          />
        )}
        <Card.Body className="d-flex flex-column">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Badge bg="secondary">{producto.codigo}</Badge>
            <small className="text-muted">{producto.categoria}</small>
          </div>
          <Card.Title>{producto.nombre}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">
            {producto.marca} - {producto.modelo}
          </Card.Subtitle>
          <Card.Text className="flex-grow-1">{producto.descripcion}</Card.Text>
          <div className="mt-auto">
            <h5 className="text-success">${producto.precio.toLocaleString('es-CL')}</h5>
            <p className="small mb-2">Stock: {producto.stock}</p>
            <Button variant="primary" className="w-100" onClick={() => agregarAlCarrito(producto)}>
              Añadir al Carrito
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ProductoCard;