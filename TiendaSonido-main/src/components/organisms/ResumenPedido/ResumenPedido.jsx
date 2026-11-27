import { Alert, Button, Card, Form } from 'react-bootstrap'
import { formatearPrecio } from '../../../utils/formato'

/**
 * Organismo: Tarjeta con el resumen del pedido, selección de despacho y botón de confirmación.
 *
 * @param {object} props
 * @param {'despacho'|'retiro'} props.tipoEntrega
 * @param {Function} props.onTipoEntregaChange
 * @param {string} props.direccion
 * @param {Function} props.onDireccionChange
 * @param {number} props.total
 * @param {string} [props.error]
 * @param {boolean} props.esUsuarioAutenticado
 * @param {Function} props.onConfirmar
 */
export default function ResumenPedido({
  tipoEntrega,
  onTipoEntregaChange,
  direccion,
  onDireccionChange,
  total,
  error,
  esUsuarioAutenticado,
  onConfirmar,
}) {
  return (
    <Card className="shadow-sm">
      <Card.Body>
        <h2 className="h5">Resumen del pedido</h2>
        <Form.Group className="my-3">
          <Form.Label className="fw-semibold">Entrega</Form.Label>
          <Form.Check
            type="radio"
            id="entrega-despacho"
            name="entrega"
            label="Despacho a domicilio"
            checked={tipoEntrega === 'despacho'}
            onChange={() => onTipoEntregaChange('despacho')}
          />
          <Form.Check
            type="radio"
            id="entrega-retiro"
            name="entrega"
            label="Retiro en tienda (Viña del Mar)"
            checked={tipoEntrega === 'retiro'}
            onChange={() => onTipoEntregaChange('retiro')}
          />
        </Form.Group>
        {tipoEntrega === 'despacho' && (
          <Form.Group className="mb-3" controlId="direccion-despacho">
            <Form.Label>Dirección de despacho</Form.Label>
            <Form.Control
              value={direccion}
              onChange={(e) => onDireccionChange(e.target.value)}
            />
          </Form.Group>
        )}
        <div className="d-flex justify-content-between fs-5 fw-bold border-top pt-3">
          <span>Total</span>
          <span data-testid="total-carrito">{formatearPrecio(total)}</span>
        </div>
        {error && (
          <Alert variant="danger" className="mt-3 mb-0">
            {error}
          </Alert>
        )}
        <Button variant="success" className="w-100 mt-3" onClick={onConfirmar}>
          {esUsuarioAutenticado ? 'Confirmar pedido' : 'Inicia sesión para comprar'}
        </Button>
      </Card.Body>
    </Card>
  )
}

