import { useState } from 'react'
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { regiones } from '../data/regiones'
import { obtenerUsuarios } from '../services/almacenamiento'
import { validarRegistro } from '../utils/validaciones'

const VACIO = {
  run: '',
  nombre: '',
  apellidos: '',
  correo: '',
  clave: '',
  confirmarClave: '',
  region: '',
  comuna: '',
  direccion: '',
}

export default function Registro() {
  const { registrar } = useAuth()
  const navigate = useNavigate()
  const [datos, setDatos] = useState(VACIO)
  const [errores, setErrores] = useState({})

  const comunas = regiones.find((r) => r.region === datos.region)?.comunas ?? []

  function cambiar(e) {
    const { name, value } = e.target
    setDatos((d) => ({
      ...d,
      [name]: value,
      // Al cambiar la región se reinicia la comuna (igual que en el JS original)
      ...(name === 'region' ? { comuna: '' } : {}),
    }))
  }

  function enviar(e) {
    e.preventDefault()
    const encontrados = validarRegistro(datos, obtenerUsuarios())
    setErrores(encontrados)
    if (Object.keys(encontrados).length > 0) return
    registrar(datos)
    navigate('/')
  }

  // Ayudante para no repetir isInvalid + Feedback en cada campo
  const campo = (name) => ({
    name,
    value: datos[name],
    onChange: cambiar,
    isInvalid: !!errores[name],
  })
  const feedback = (name) => (
    <Form.Control.Feedback type="invalid">{errores[name]}</Form.Control.Feedback>
  )

  return (
    <Container className="py-5" style={{ maxWidth: 720 }}>
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="h3 mb-4">Registro de usuario</h1>
          <Form onSubmit={enviar} noValidate>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group controlId="run">
                  <Form.Label>RUN</Form.Label>
                  <Form.Control placeholder="Ej: 19011022K" {...campo('run')} />
                  <Form.Text muted>Sin puntos ni guion.</Form.Text>
                  {feedback('run')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="correo">
                  <Form.Label>Correo electrónico</Form.Label>
                  <Form.Control type="email" placeholder="ejemplo@duoc.cl" {...campo('correo')} />
                  {feedback('correo')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="nombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control maxLength={50} {...campo('nombre')} />
                  {feedback('nombre')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="apellidos">
                  <Form.Label>Apellidos</Form.Label>
                  <Form.Control maxLength={100} {...campo('apellidos')} />
                  {feedback('apellidos')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="clave">
                  <Form.Label>Contraseña (4 a 10 caracteres)</Form.Label>
                  <Form.Control type="password" {...campo('clave')} />
                  {feedback('clave')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="confirmarClave">
                  <Form.Label>Confirmar contraseña</Form.Label>
                  <Form.Control type="password" {...campo('confirmarClave')} />
                  {feedback('confirmarClave')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="region">
                  <Form.Label>Región</Form.Label>
                  <Form.Select {...campo('region')}>
                    <option value="">-- Seleccione región --</option>
                    {regiones.map((r) => (
                      <option key={r.region} value={r.region}>
                        {r.region}
                      </option>
                    ))}
                  </Form.Select>
                  {feedback('region')}
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group controlId="comuna">
                  <Form.Label>Comuna</Form.Label>
                  <Form.Select {...campo('comuna')} disabled={!datos.region}>
                    <option value="">-- Seleccione comuna --</option>
                    {comunas.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                  {feedback('comuna')}
                </Form.Group>
              </Col>
              <Col xs={12}>
                <Form.Group controlId="direccion">
                  <Form.Label>Dirección</Form.Label>
                  <Form.Control maxLength={300} {...campo('direccion')} />
                  {feedback('direccion')}
                </Form.Group>
              </Col>
            </Row>
            <Button type="submit" variant="success" className="mt-4 w-100">
              Registrar
            </Button>
          </Form>
          <p className="mt-3 mb-0 text-center">
            ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}
