import AvisoCarritoContainer from '../../containers/AvisoCarritoContainer'
import BarraNavegacionContainer from '../../containers/BarraNavegacionContainer'
import PiePagina from '../organisms/PiePagina/PiePagina'

/**
 * Template principal de la tienda pública.
 *
 * Define la estructura visual y distribución general:
 * Barra de navegación → Contenido principal (<main>) → Pie de página → Aviso flotante del carrito.
 *
 * No contiene operaciones de negocio ni llamadas directas a servicios.
 *
 * @param {object} props
 * @param {React.ReactNode} [props.navbar] - Componente/slot para la barra de navegación.
 * @param {React.ReactNode} [props.footer] - Componente/slot para el pie de página.
 * @param {React.ReactNode} [props.aviso] - Componente/slot para el toast de aviso.
 * @param {React.ReactNode} props.children - Contenido de la página.
 */
export default function TiendaLayout({
  navbar = <BarraNavegacionContainer />,
  footer = <PiePagina />,
  aviso = <AvisoCarritoContainer />,
  children,
}) {
  return (
    <div className="d-flex flex-column min-vh-100">
      {navbar}
      <main className="flex-grow-1">{children}</main>
      {footer}
      {aviso}
    </div>
  )
}
