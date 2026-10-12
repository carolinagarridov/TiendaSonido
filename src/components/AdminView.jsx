import { useState } from 'react';
import { Container, Form, Button, Table, Row, Col } from 'react-bootstrap';

function AdminView({ productos, agregarProducto, eliminarProducto }) {
  const [form, setForm] = useState({
    codigo: '', nombre: '', categoria: 'Guitarras Acústicas',
    marca: '', modelo: '', precio: '', stock: '', descripcion: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    agregarProducto({
      ...form,
      precio: parseInt(form.precio),
      stock: parseInt(form.stock)
    });
    setForm({ codigo: '', nombre: '', categoria: 'Guitarras Acústicas', marca: '', modelo: '', precio: '', stock: '', descripcion: '' });
  };

  return (
    <Container className="mt-4">
      <h2>Panel Administrador</h2>
      <Form onSubmit={handleSubmit} className="p-3 border rounded bg-light mb-4">
        {/* AQUÍ VA EL BLOQUE CON xs={12} md={3} */}
        <Row>
          <Col xs={12} md={3}>
            <Form.Group className="mb-2">
              <Form.Label>Código</Form.Label>
              <Form.Control required value={form.codigo} onChange={e => setForm({...form, codigo: e.target.value.toUpperCase()})} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-2">
              <Form.Label>Nombre</Form.Label>
              <Form.Control required value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-2">
              <Form.Label>Marca</Form.Label>
              <Form.Control required value={form.marca} onChange={e => setForm({...form, marca: e.target.value})} />
            </Form.Group>
          </Col>
          <Col xs={12} md={3}>
            <Form.Group className="mb-2">
              <Form.Label>Precio (CLP)</Form.Label>
              <Form.Control type="number" required value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} />
            </Form.Group>
          </Col>
        </Row>
        
        <Button type="submit" variant="success" className="mt-2">Guardar Producto</Button>
      </Form>

      <h3>Productos Cargados</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(p => (
            <tr key={p.codigo}>
              <td>{p.codigo}</td>
              <td>{p.nombre}</td>
              <td>${p.precio.toLocaleString('es-CL')}</td>
              <td>
                <Button variant="danger" size="sm" onClick={() => eliminarProducto(p.codigo)}>Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default AdminView;