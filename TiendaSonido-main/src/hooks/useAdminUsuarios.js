import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { ROLES } from '../data/usuarios'
import { guardarUsuarios, obtenerUsuarios } from '../services/almacenamiento'
import { validarClave, validarCorreo } from '../utils/validaciones'

const VACIO = { nombre: '', apellidos: '', correo: '', clave: '', rol: ROLES.VENDEDOR }

/**
 * Hook para la gestión de usuarios en el panel de administración.
 */
export function useAdminUsuarios() {
  const { usuario: usuarioActual } = useAuth()
  const [usuarios, setUsuarios] = useState(() => obtenerUsuarios())
  const [form, setForm] = useState(VACIO)
  const [error, setError] = useState('')

  function actualizar(lista) {
    setUsuarios(lista)
    guardarUsuarios(lista)
  }

  function cambiarCampo(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
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
      {
        ...form,
        correo: form.correo.trim().toLowerCase(),
        run: '',
        region: '',
        comuna: '',
        direccion: '',
        activo: true,
      },
    ])
    setForm(VACIO)
    setError('')
  }

  return {
    usuarios,
    form,
    error,
    usuarioActual,
    cambiarCampo,
    crear,
    editar,
  }
}

