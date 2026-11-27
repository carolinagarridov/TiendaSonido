import AdminProductos from '../components/organisms/AdminProductos/AdminProductos'
import { useAdminProductos } from '../hooks/useAdminProductos'

/**
 * Container para la gestión de productos e inventario en administración.
 * Conecta el hook useAdminProductos con el componente presentacional AdminProductos.
 *
 * @param {object} props
 * @param {boolean} props.puedeEditarCatalogo
 */
export default function AdminProductosContainer({ puedeEditarCatalogo }) {
  const {
    productos,
    form,
    mensaje,
    cambiarCampo,
    agregar,
    eliminar,
    cambiarStock,
    cerrarMensaje,
  } = useAdminProductos()

  return (
    <AdminProductos
      productos={productos}
      form={form}
      mensaje={mensaje}
      puedeEditarCatalogo={puedeEditarCatalogo}
      onCampoChange={cambiarCampo}
      onAgregar={agregar}
      onEliminar={eliminar}
      onCambiarStock={cambiarStock}
      onCerrarMensaje={cerrarMensaje}
    />
  )
}

