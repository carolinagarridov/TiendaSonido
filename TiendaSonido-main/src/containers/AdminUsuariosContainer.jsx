import AdminUsuarios from '../components/organisms/AdminUsuarios/AdminUsuarios'
import { useAdminUsuarios } from '../hooks/useAdminUsuarios'

/**
 * Container para la gestión de usuarios en el panel de administración.
 * Conecta el hook useAdminUsuarios con el componente presentacional AdminUsuarios.
 */
export default function AdminUsuariosContainer() {
  const {
    usuarios,
    form,
    error,
    usuarioActual,
    cambiarCampo,
    crear,
    editar,
  } = useAdminUsuarios()

  return (
    <AdminUsuarios
      usuarios={usuarios}
      form={form}
      error={error}
      usuarioActual={usuarioActual}
      onCampoChange={cambiarCampo}
      onCrear={crear}
      onEditar={editar}
    />
  )
}

