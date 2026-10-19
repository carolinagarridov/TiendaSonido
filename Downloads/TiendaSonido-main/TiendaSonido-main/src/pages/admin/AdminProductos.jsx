import { useState } from 'react'
import { Alert, Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { CATEGORIAS } from '../../data/productos'
import { guardarProductos, obtenerProductos } from '../../services/almacenamiento'
import { formatearPrecio } from '../../utils/formato'

const VACIO = {
  codigo: '',
  nombre: '',
  categoria: '',
  marca: '',
  modelo: '',
  precio: '',
  stock: '',
  descripcion: '',
}

export default function AdminProductos({ puedeEditarCatalogo }) {
  const [productos, setProductos] = useState(() => obtenerProductos())
  const [form, setForm] = useState(VACIO)
  const [mensaje, setMensaje] = useState(null)

  function actualizar(lista) {
    setProductos(lista)
    guardarProductos(lista)
  }

  function agregar(e) {
    e.preventDefault()
    const codigo = form.codigo.trim().toUpperCase()
    if (productos.some((p) => p.codigo === codigo)) {
      setMensaje({ tipo: 'danger', texto: 'El código ingresado ya existe. Usa uno diferente.' })
      return
    }
    const nuevo = {
      ...form,
      codigo,
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      descripcion: form.descripcion.trim(),
      precio: parseInt(form.precio, 10),
      stock: parseInt(form.stock, 10),
      imagen: `img/productos/${codigo}.jpg`,
    }
    actualizar([...productos, nuevo])
    setForm(VACIO)
    setMensaje({ tipo: 'success', texto: `Producto "${nuevo.nombre}" agregado.` })
  }

  function eliminar(codigo) {
    if (window.confirm(`¿Eliminar el producto ${codigo}?`)) {
      actualizar(productos.filter((p) => p.codigo !== codigo))
    }
  }

  function cambiarStock(codigo, valor) {
    const stock = Math.max(0, parseInt(valor, 10) || 0)
    actualizar(productos.map((p) => (p.codigo === codigo ? { ...p, stock } : p)))
  }

  const campo = (name) => ({
    name,
    value: form[name],
    onChange: (e) => setForm((f) => ({ ...f, [name]: e.target.value })),
    required: true,
  })

  return (
    <>
      {puedeEditarCatalogo && (
        <Card className="mb-4 shadow-sm">
          <Card.Body>
            <h2 className="h5 mb-3">Agregar nuevo producto</h2>
            {mensaje && (
              <Alert variant={mensaje.tipo} dismissible onClose={() => setMensaje(null)}>
                {mensaje.texto}
              </Alert>
            )}
            <Form onSubmit={agregar}>
              <Row className="g-3">
                <Col sm={6} lg={3}>
                  <Form.Group controlId="admin-codigo">
                    <Form.Label>Código</Form.Label>
                    <Form.Control placeholder="Ej: GA006" {...campo('codigo')} />
                  </Form.Group>
                </Col>
                <Col sm={6} lg={5}>
                  <Form.Group controlId="admin-nombre">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control {...campo('nombre')} />
                  </Form.Group>
                </Col>
                <Col sm={12} lg={4}>
                  <Form.Group controlId="admin-categoria">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select {...campo('categoria')}>
                      <option value="">-- Seleccionar --</option>
                      {CATEGORIAS.map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Group controlId="admin-marca">
                    <Form.Label>Marca</Form.Label>
                    <Form.Control {...campo('marca')} />
                  </Form.Group>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Group controlId="admin-modelo">
                    <Form.Label>Modelo</Form.Label>
                    <Form.Control {...campo('modelo')} />
                  </Form.Group>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Group controlId="admin-precio">
                    <Form.Label>Precio (CLP)</Form.Label>
                    <Form.Control type="number" min={1} {...campo('precio')} />
                  </Form.Group>
                </Col>
                <Col sm={6} lg={3}>
                  <Form.Group controlId="admin-stock">
                    <Form.Label>Stock</Form.Label>
                    <Form.Control type="number" min={0} {...campo('stock')} />
                  </Form.Group>
                </Col>
                <Col xs={12}>
                  <Form.Group controlId="admin-descripcion">
                    <Form.Label>Descripción breve</Form.Label>
                    <Form.Control {...campo('descripcion')} />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Text muted className="d-block mt-2">
                La foto se toma de <code>public/img/productos/CODIGO.jpg</code>.
              </Form.Text>
              <Button type="submit" variant="success" className="mt-3">
                Guardar producto
              </Button>
            </Form>
          </Card.Body>
        </Card>
      )}

      <h2 className="h5">Inventario ({productos.length} productos)</h2>
      <Table striped hover responsive className="align-middle bg-white">
        <thead className="table-dark">
          <tr>
            <th>Código</th>
            <th>Nombre</th>
            <th className="d-none d-md-table-cell">Categoría</th>
            <th>Precio</th>
            <th style={{ width: 110 }}>Stock</th>
            {puedeEditarCatalogo && <th>Acción</th>}
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.codigo} className={p.stock === 0 ? 'table-danger' : undefined}>
              <td>
                <strong>{p.codigo}</strong>
              </td>
              <td>{p.nombre}</td>
              <td className="d-none d-md-table-cell">{p.categoria}</td>
              <td>{formatearPrecio(p.precio)}</td>
              <td>
                <Form.Control
                  size="sm"
                  type="number"
                  min={0}
                  aria-label={`Stock de ${p.nombre}`}
                  value={p.stock}
                  onChange={(e) => cambiarStock(p.codigo, e.target.value)}
                />
              </td>
              {puedeEditarCatalogo && (
                <td>
                  <Button size="sm" variant="danger" onClick={() => eliminar(p.codigo)}>
                    Eliminar
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  )
}
