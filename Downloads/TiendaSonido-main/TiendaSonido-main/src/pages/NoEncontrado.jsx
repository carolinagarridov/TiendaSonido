import { Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default function NoEncontrado() {
  return (
    <Container className="py-5 text-center">
      <h1 className="display-6">Página no encontrada</h1>
      <p className="text-muted">La página que buscas no existe.</p>
      <Button as={Link} to="/" variant="warning">
        Volver al inicio
      </Button>
    </Container>
  )
}
