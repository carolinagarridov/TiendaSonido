import { Form, Table } from 'react-bootstrap'
import { formatearPrecio } from '../../../utils/formato'
import { ESTADOS_PEDIDO } from '../../../utils/pedidos'

/**
 * Organismo presentacional: Tabla de gestión de pedidos en administración.
 *
 * @param {object} props
 * @param {Array} props.pedidos - Lista de pedidos.
 * @param {Function} props.onCambiarEstado - (numero, nuevoEstado) => void
 */
export default function AdminPedidos({ pedidos = [], onCambiarEstado }) {
  if (pedidos.length === 0) return <p className="text-muted">Todavía no hay pedidos.</p>

  return (
    <Table striped hover responsive className="align-middle bg-white">
      <thead className="table-dark">
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Cliente</th>
          <th className="d-none d-md-table-cell">Entrega</th>
          <th>Total</th>
          <th style={{ minWidth: 160 }}>Estado</th>
        </tr>
      </thead>
      <tbody>
        {pedidos.map((p) => (
          <tr key={p.numero}>
            <td>{p.numero}</td>
            <td>{new Date(p.fecha).toLocaleDateString('es-CL')}</td>
            <td>
              {p.cliente.nombre}
              <div className="small text-muted">{p.cliente.correo}</div>
            </td>
            <td className="d-none d-md-table-cell small">
              {p.entrega.tipo === 'despacho' ? 'Despacho' : 'Retiro'} – {p.entrega.direccion}
            </td>
            <td>{formatearPrecio(p.total)}</td>
            <td>
              <Form.Select
                size="sm"
                aria-label={`Estado del pedido ${p.numero}`}
                value={p.estado}
                onChange={(e) => onCambiarEstado(p.numero, e.target.value)}
              >
                {ESTADOS_PEDIDO.map((e) => (
                  <option key={e}>{e}</option>
                ))}
              </Form.Select>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
