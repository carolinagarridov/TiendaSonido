import { useMemo } from 'react'
import { Alert, Button, Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import GrillaProductos from '../components/organisms/GrillaProductos/GrillaProductos'
import { useCarrito } from '../context/CarritoContext'
import { obtenerProductos } from '../services/almacenamiento'

/**
 * Página: Vista de productos en oferta.
 *
 * Muestra productos identificados como ofertas en el catálogo de datos disponibles.
 * Si los datos actuales no cuentan con productos marcados en oferta, presenta
 * un estado coherente sin inventar descuentos ni productos inexistentes.
 */
export default function Ofertas() {
  const { agregar } = useCarrito()
  const productos = useMemo(() => obtenerProductos(), [])

  // Filtra productos que tengan la propiedad oferta o enOferta activa
  const productosOferta = useMemo(() => {
    return productos.filter((p) => Boolean(p.oferta || p.enOferta))
  }, [productos])

  return (
    <Container className="py-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 pb-2 border-bottom">
        <div>
          <h1 className="h3 mb-0">Ofertas y Promociones</h1>
          <small className="text-muted">
            {productosOferta.length > 0
              ? `${productosOferta.length} producto${productosOferta.length === 1 ? '' : 's'} con descuento especial`
              : 'Precios de oportunidad y promociones vigentes'}
          </small>
        </div>
        <Button as={Link} to="/productos" variant="outline-primary" size="sm">
          Ver todo el catálogo
        </Button>
      </div>

      {productosOferta.length > 0 ? (
        <GrillaProductos
          productos={productosOferta}
          onAgregar={agregar}
          mensajeVacio="No hay ofertas disponibles en este momento."
        />
      ) : (
        <div className="text-center py-5">
          <div className="mb-4">
            <span className="badge bg-warning text-dark fs-6 px-3 py-2">
              Información de catálogo
            </span>
          </div>
          <h2 className="h4 mb-3">No hay ofertas comerciales activas en este momento</h2>
          <p className="text-muted mx-auto mb-4" style={{ maxWidth: '580px' }}>
            Actualmente todos los productos del inventario se comercializan bajo su precio de lista oficial.
            Te invitamos a explorar nuestras familias de instrumentos con stock garantizado.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Button as={Link} to="/productos" variant="warning">
              Explorar instrumentos
            </Button>
            <Button as={Link} to="/categorias" variant="outline-secondary">
              Ver por categorías
            </Button>
          </div>
        </div>
      )}
    </Container>
  )
}

