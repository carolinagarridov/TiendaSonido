import { useState } from 'react'
import { Alert, Badge, Button, Card, Col, Form, Row, Table } from 'react-bootstrap'
import { useAuth } from '../../context/AuthContext'
import { NOMBRE_ROL, ROLES } from '../../data/usuarios'
import { guardarUsuarios, obtenerUsuarios } from '../../services/almacenamiento'
import { validarClave, validarCorreo } from '../../utils/validaciones'

const VACIO = { nombre: '', apellidos: '', correo: '', clave: '', rol: ROLES.VENDEDOR }

export default function AdminUsuarios() {
  const { usuario: yo } = useAuth()
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())
  const [form, setForm] = useState(VACIO)
  const [error, setError] = useState('')

  function actualizar(lista) {
    setUsuarios(lista)
    guardarUsuarios(lista)
  }

  function editar(correo, cambios) {
    actualizar(usuarios.map((u) => (u.correo === correo ? { ...u, ...cambios } : u)))
  }

  function crear(e) {
    e.preventDefault()
    if (!validarCorreo(form.correo)) return setError('Correo inválido.')
    if (!validarClave(form.clave)) return setError('La contraseña debe tener entre 4 y 10 caracteres.')
    if (usuarios.some((u) => u.correo.toLowerCase() === form.correo.trim().toLowerCase())) {
      return setError('Ese correo ya está registrado.')
    }
    actualizar([
      ...usuarios,
      { ...form, correo: form.correo.trim().toLowerCase(), run: '', region: '', comuna: '', direccion: '', activo: true },
    ])
    setForm(VACIO)
    setError('')
  }

  const campo = (name) => ({
    value: form[name],
    onChange: (e) => setForm((f) => ({ ...f, [name]: e.target.value })),
    required: true,
  })

  return (
    <>
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h2 className="h5 mb-3">Crear usuario</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={crear}>
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
            const soyYo = u.correo === yo.correo
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
                    onChange={(e) => editar(u.correo, { rol: e.target.value })}
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
                    onClick={() => editar(u.correo, { activo: u.activo === false })}
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
