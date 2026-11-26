import { useState } from 'react'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { validarCorreo } from '../utils/validaciones'

export default function PiePagina() {
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  function suscribir(e) {
    e.preventDefault()
    setMensaje(validarCorreo(correo) ? '¡Gracias por suscribirte!' : 'Ingresa un correo válido.')
    if (validarCorreo(correo)) setCorreo('')
  }

  return (
    <footer className="pie-pagina mt-5 py-4">
      <Container>
        <Row className="gy-3 align-items-center">
          <Col md={6}>
            <p className="mb-1">&copy; 2026 Sonido Vivo. Viña del Mar, Chile.</p>
            <p className="mb-0 small text-white-50">
              Guitarras · Bajos · Baterías · Teclados · Amplificadores · Audio profesional
            </p>
          </Col>
          <Col md={6}>
            <Form onSubmit={suscribir}>
              <Form.Label htmlFor="newsletter-email" className="small">
                Suscríbete al boletín
              </Form.Label>
              <InputGroup>
                <Form.Control
                  id="newsletter-email"
                  type="email"
                  placeholder="tu@correo.cl"
                  value={correo}
                  onChange={(e) => setCorreo(e.target.value)}
                />
                <Button type="submit" variant="warning">
                  Suscribirme
                </Button>
              </InputGroup>
              {mensaje && <Form.Text className="text-white-50">{mensaje}</Form.Text>}
            </Form>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
