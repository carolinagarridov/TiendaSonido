import { Accordion, Alert, Badge, Container, Table } from 'react-bootstrap'
import { useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { obtenerPedidos } from '../services/almacenamiento'
import { formatearPrecio } from '../utils/formato'
import { COLOR_ESTADO } from '../utils/pedidos'

export default function MisPedidos() {
  const { usuario } = useAuth()
  const location = useLocation()
  // Un cliente solo ve SUS pedidos
  const pedidos = obtenerPedidos()
    .filter((p) => p.cliente.correo === usuario.correo)
    .sort((a, b) => b.numero - a.numero)

  return (
    <Container className="py-4">
      <h1 className="h3 mb-4">Mis pedidos</h1>
      {location.state?.nuevo && (
        <Alert variant="success">
          ¡Pedido #{location.state.nuevo} confirmado! Te avisaremos cuando cambie su estado.
        </Alert>
      )}
      {pedidos.length === 0 ? (
        <p className="text-muted">Aún no tienes pedidos.</p>
      ) : (
        <Accordion defaultActiveKey={String(pedidos[0].numero)}>
          {pedidos.map((p) => (
            <Accordion.Item eventKey={String(p.numero)} key={p.numero}>
              <Accordion.Header>
                <div className="d-flex flex-wrap gap-2 align-items-center w-100 me-3">
                  <strong>#{p.numero}</strong>
                  <span className="text-muted small">{new Date(p.fecha).toLocaleDateString('es-CL')}</span>
                  <Badge bg={COLOR_ESTADO[p.estado]} text={p.estado === 'En preparación' ? 'dark' : undefined}>
                    {p.estado}
                  </Badge>
                  <span className="ms-auto fw-bold">{formatearPrecio(p.total)}</span>
                </div>
              </Accordion.Header>
              <Accordion.Body>
                <p className="small mb-2">
                  <strong>{p.entrega.tipo === 'despacho' ? 'Despacho a:' : 'Retiro en:'}</strong>{' '}
                  {p.entrega.direccion}
                </p>
                <Table size="sm" responsive className="mb-0">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th className="text-center">Cant.</th>
                      <th className="text-end">Subtotal</th>
                    </tr>
                  </thead>
                  <tbody>
                    {p.items.map((i) => (
                      <tr key={i.codigo}>
                        <td>{i.nombre}</td>
                        <td className="text-center">{i.cantidad}</td>
                        <td className="text-end">{formatearPrecio(i.precio * i.cantidad)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      )}
    </Container>
  )
}
