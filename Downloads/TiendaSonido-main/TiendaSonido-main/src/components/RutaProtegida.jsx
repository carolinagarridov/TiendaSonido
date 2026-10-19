import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Si no hay sesión, manda al login (y vuelve después). Si el rol no corresponde, manda al inicio.
export default function RutaProtegida({ roles, children }) {
  const { usuario } = useAuth()
  const location = useLocation()

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />
  }
  if (roles && !roles.includes(usuario.rol)) {
    return <Navigate to="/" replace />
  }
  return children
}
