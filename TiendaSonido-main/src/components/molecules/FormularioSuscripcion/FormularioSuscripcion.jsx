import { Button, Form, InputGroup } from 'react-bootstrap'

/**
 * Molécula: Formulario de suscripción al boletín / newsletter.
 *
 * @param {object} props
 * @param {string} props.correo
 * @param {Function} props.onCorreoChange
 * @param {Function} props.onSubmit
 * @param {string} [props.mensaje]
 */
export default function FormularioSuscripcion({
  correo,
  onCorreoChange,
  onSubmit,
  mensaje,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Form.Label htmlFor="newsletter-email" className="small">
        Suscríbete al boletín
      </Form.Label>
      <InputGroup>
        <Form.Control
          id="newsletter-email"
          type="email"
          placeholder="tu@correo.cl"
          value={correo}
          onChange={(e) => onCorreoChange(e.target.value)}
        />
        <Button type="submit" variant="warning">
          Suscribirme
        </Button>
      </InputGroup>
      {mensaje && <Form.Text className="text-white-50">{mensaje}</Form.Text>}
    </Form>
  )
}

