import { useState } from 'react'
import { Alert, Button, Card, Container, Form } from 'react-bootstrap'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { iniciarSesion } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [correo, setCorreo] = useState('')
  const [clave, setClave] = useState('')
  const [error, setError] = useState('')

  function enviar(e) {
    e.preventDefault()
    const resultado = iniciarSesion(correo, clave)
    if (!resultado.ok) {
      setError(resultado.mensaje)
      return
    }
    const destino =
      location.state?.desde ??
      (['admin', 'vendedor'].includes(resultado.usuario.rol) ? '/admin' : '/')
    navigate(destino, { replace: true })
  }

  return (
    <Container className="py-5 contenedor-formulario">
      <Card className="shadow-sm">
        <Card.Body className="p-4">
          <h1 className="h3 mb-4">Iniciar sesión</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={enviar} noValidate>
            <Form.Group className="mb-3" controlId="loginCorreo">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="ejemplo@duoc.cl"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginClave">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                type="password"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                required
              />
            </Form.Group>
            <Button type="submit" variant="success" className="w-100">
              Ingresar
            </Button>
          </Form>
          <p className="mt-3 mb-0 text-center">
            ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  )
}
