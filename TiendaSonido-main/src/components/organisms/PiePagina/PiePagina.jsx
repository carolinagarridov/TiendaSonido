import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { validarCorreo } from '../../../utils/validaciones'
import FormularioSuscripcion from '../../molecules/FormularioSuscripcion/FormularioSuscripcion'

/**
 * Organismo: Pie de página de la tienda.
 *
 * Contiene información legal de la marca y compone la molécula FormularioSuscripcion.
 */
export default function PiePagina() {
  const [correo, setCorreo] = useState('')
  const [mensaje, setMensaje] = useState('')

  function suscribir(e) {
    e.preventDefault()
    const esValido = validarCorreo(correo)
    setMensaje(esValido ? '¡Gracias por suscribirte!' : 'Ingresa un correo válido.')
    if (esValido) setCorreo('')
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
            <FormularioSuscripcion
              correo={correo}
              onCorreoChange={setCorreo}
              onSubmit={suscribir}
              mensaje={mensaje}
            />
          </Col>
        </Row>
      </Container>
    </footer>
  )
}
