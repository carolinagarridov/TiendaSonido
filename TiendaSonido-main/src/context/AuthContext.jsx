import { createContext, useContext, useState } from 'react'
import {
  borrarSesion,
  guardarSesion,
  guardarUsuarios,
  obtenerSesion,
  obtenerUsuarios,
} from '../services/almacenamiento'
import { formatearRun } from '../utils/validaciones'

const AuthContext = createContext(null)

// Nunca dejamos la clave dentro del objeto de sesión
function sinClave(usuario) {
  const { clave: _clave, ...resto } = usuario
  return resto
}

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => obtenerSesion())

  function iniciarSesion(correo, clave) {
    const encontrado = obtenerUsuarios().find(
      (u) => u.correo.toLowerCase() === correo.trim().toLowerCase() && u.clave === clave,
    )
    if (!encontrado) return { ok: false, mensaje: 'Correo o contraseña incorrectos.' }
    if (encontrado.activo === false) {
      return { ok: false, mensaje: 'Tu cuenta está desactivada. Contacta a la tienda.' }
    }
    const sesion = sinClave(encontrado)
    guardarSesion(sesion)
    setUsuario(sesion)
    return { ok: true, usuario: sesion }
  }

  function registrar(datos) {
    const nuevo = {
      run: formatearRun(datos.run),
      nombre: datos.nombre.trim(),
      apellidos: datos.apellidos.trim(),
      correo: datos.correo.trim().toLowerCase(),
      clave: datos.clave,
      region: datos.region,
      comuna: datos.comuna,
      direccion: datos.direccion.trim(),
      rol: 'cliente',
      activo: true,
    }
    guardarUsuarios([...obtenerUsuarios(), nuevo])
    const sesion = sinClave(nuevo)
    guardarSesion(sesion)
    setUsuario(sesion)
    return sesion
  }

  function cerrarSesion() {
    borrarSesion()
    setUsuario(null)
  }

  const tieneRol = (...roles) => !!usuario && roles.includes(usuario.rol)

  return (
    <AuthContext.Provider value={{ usuario, iniciarSesion, registrar, cerrarSesion, tieneRol }}>
      {children}
    </AuthContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de <AuthProvider>')
  return ctx
}
