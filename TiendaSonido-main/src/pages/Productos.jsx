import { Container } from 'react-bootstrap'
import FiltroBusqueda from '../components/molecules/FiltroBusqueda/FiltroBusqueda'
import GrillaProductos from '../components/organisms/GrillaProductos/GrillaProductos'
import { useCarrito } from '../context/CarritoContext'
import { CATEGORIAS } from '../data/productos'
import { useFiltroProductos } from '../hooks/useFiltroProductos'

export default function Productos() {
  const { agregar } = useCarrito()
  const {
    filtrados,
    categoria,
    setCategoria,
    busqueda,
    setBusqueda,
  } = useFiltroProductos()

  return (
    <Container className="py-4">
      <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-md-center mb-4 pb-3 border-bottom">
        <div>
          <h1 className="h3 mb-0">Catálogo de instrumentos</h1>
          <small className="text-muted">
            {filtrados.length} producto{filtrados.length === 1 ? '' : 's'}
            {categoria !== 'Todas' && ` en ${categoria}`}
          </small>
        </div>
        <FiltroBusqueda
          busqueda={busqueda}
          onBusquedaChange={setBusqueda}
          categoria={categoria}
          onCategoriaChange={setCategoria}
          categorias={CATEGORIAS}
        />
      </div>

      <GrillaProductos
        productos={filtrados}
        onAgregar={agregar}
        mensajeVacio="No hay productos que coincidan con tu búsqueda."
      />
    </Container>
  )
}
