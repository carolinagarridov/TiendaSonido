import { Alert, Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { NOMBRE_ROL, ROLES } from '../../../data/usuarios'

/**
 * Organismo presentacional: Gestión y creación de usuarios en administración.
 *
 * @param {object} props
 * @param {Array} props.usuarios
 * @param {object} props.form
 * @param {string} [props.error]
 * @param {object|null} props.usuarioActual - Usuario en sesión (para no editarse/desactivarse a sí mismo)
 * @param {Function} props.onCampoChange - (name, value) => void
 * @param {Function} props.onCrear - (e) => void
 * @param {Function} props.onEditar - (correo, cambios) => void
 */
export default function AdminUsuarios({
  usuarios = [],
  form = {},
  error = '',
  usuarioActual,
  onCampoChange,
  onCrear,
  onEditar,
}) {
  const campo = (name) => ({
    value: form[name] || '',
    onChange: (e) => onCampoChange(name, e.target.value),
    required: true,
  })

  return (
    <>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h2 className="h5 mb-3">Crear usuario</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={onCrear}>
            <Row className="g-3 align-items-end">
              <Col sm={6} lg={2}>
                <Form.Label htmlFor="nu-nombre">Nombre</Form.Label>
                <Form.Control id="nu-nombre" {...campo('nombre')} />
              </Col>
              <Col sm={6} lg={2}>
                <Form.Label htmlFor="nu-apellidos">Apellidos</Form.Label>
                <Form.Control id="nu-apellidos" {...campo('apellidos')} />
              </Col>
              <Col sm={6} lg={3}>
                <Form.Label htmlFor="nu-correo">Correo</Form.Label>
                <Form.Control id="nu-correo" type="email" {...campo('correo')} />
              </Col>
              <Col sm={6} lg={2}>
                <Form.Label htmlFor="nu-clave">Contraseña</Form.Label>
                <Form.Control id="nu-clave" type="password" {...campo('clave')} />
              </Col>
              <Col sm={6} lg={2}>
                <Form.Label htmlFor="nu-rol">Rol</Form.Label>
                <Form.Select id="nu-rol" {...campo('rol')}>
                  {Object.values(ROLES).map((r) => (
                    <option key={r} value={r}>
                      {NOMBRE_ROL[r]}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col sm={6} lg={1}>
                <Button type="submit" variant="success" className="w-100">
                  Crear
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>

      <Table striped hover responsive className="align-middle bg-white">
        <thead className="table-dark">
          <tr>
            <th>Nombre</th>
            <th>Correo</th>
            <th style={{ minWidth: 150 }}>Rol</th>
            <th>Estado</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => {
            const soyYo = usuarioActual && u.correo === usuarioActual.correo
            return (
              <tr key={u.correo}>
                <td>
                  {u.nombre} {u.apellidos}
                </td>
                <td>{u.correo}</td>
                <td>
                  <Form.Select
                    size="sm"
                    aria-label={`Rol de ${u.correo}`}
                    value={u.rol}
                    disabled={soyYo}
                    onChange={(e) => onEditar(u.correo, { rol: e.target.value })}
                  >
                    {Object.values(ROLES).map((r) => (
                      <option key={r} value={r}>
                        {NOMBRE_ROL[r]}
                      </option>
                    ))}
                  </Form.Select>
                </td>
                <td>
                  <Badge bg={u.activo !== false ? 'success' : 'secondary'}>
                    {u.activo !== false ? 'Activo' : 'Inactivo'}
                  </Badge>
                </td>
                <td>
                  <Button
                    size="sm"
                    variant={u.activo !== false ? 'outline-danger' : 'outline-success'}
                    disabled={soyYo}
                    onClick={() => onEditar(u.correo, { activo: u.activo === false })}
                  >
                    {u.activo !== false ? 'Desactivar' : 'Activar'}
                  </Button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    </>
  )
}
