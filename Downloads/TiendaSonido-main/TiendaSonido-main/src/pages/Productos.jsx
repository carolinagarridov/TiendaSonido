import { useMemo, useState } from 'react'
import { Col, Container, Dropdown, Form, Row } from 'react-bootstrap'
import TarjetaProducto from '../components/TarjetaProducto'
import { useCarrito } from '../context/CarritoContext'
import { CATEGORIAS } from '../data/productos'
import { obtenerProductos } from '../services/almacenamiento'

export default function Productos() {
  const { agregar } = useCarrito()
  const [productos] = useState(() => obtenerProductos())
  const [categoria, setCategoria] = useState('Todas')
  const [busqueda, setBusqueda] = useState('')

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return productos.filter(
      (p) =>
        (categoria === 'Todas' || p.categoria === categoria) &&
        (!texto ||
          `${p.nombre} ${p.marca} ${p.modelo}`.toLowerCase().includes(texto)),
    )
  }, [productos, categoria, busqueda])

  return (
    <Container className="py-4">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
        <div>
          <h1 className="h3 mb-0">Catálogo de instrumentos</h1>
          <small className="text-muted">
            {filtrados.length} producto{filtrados.length === 1 ? '' : 's'}
            {categoria !== 'Todas' && ` en ${categoria}`}
          </small>
        </div>
        <div className="d-flex flex-column flex-sm-row gap-2">
          <Form.Control
            type="search"
            placeholder="Buscar por nombre, marca o modelo"
            aria-label="Buscar productos"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <Dropdown onSelect={(valor) => setCategoria(valor)}>
            <Dropdown.Toggle variant="primary" id="filtro-categoria" className="w-100 text-nowrap">
              &#9776; {categoria === 'Todas' ? 'Categorías' : categoria}
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Item eventKey="Todas" active={categoria === 'Todas'}>
                Todas las categorías
              </Dropdown.Item>
              <Dropdown.Divider />
              {CATEGORIAS.map((c) => (
                <Dropdown.Item key={c} eventKey={c} active={categoria === c}>
                  {c}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <p className="text-muted">No hay productos que coincidan con tu búsqueda.</p>
      ) : (
        <Row xs={1} sm={2} md={3} xl={4} className="g-4">
          {filtrados.map((p) => (
            <Col key={p.codigo}>
              <TarjetaProducto producto={p} onAgregar={agregar} />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  )
}
