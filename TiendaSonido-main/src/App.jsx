import { Outlet, Route, Routes } from 'react-router-dom'
import TiendaLayout from './components/templates/TiendaLayout'
import RutaProtegida from './guards/RutaProtegida/RutaProtegida'
import Admin from './pages/admin/Admin'
import Carrito from './pages/Carrito'
import Categorias from './pages/Categorias'
import Checkout from './pages/Checkout'
import CompraExitosa from './pages/CompraExitosa'
import CompraFallida from './pages/CompraFallida'
import DetalleProducto from './pages/DetalleProducto'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import MisPedidos from './pages/MisPedidos'
import NoEncontrado from './pages/NoEncontrado'
import Ofertas from './pages/Ofertas'
import Productos from './pages/Productos'
import Registro from './pages/Registro'

/**
 * Envoltorio para las rutas de la tienda pública.
 * Integra el layout público (Navbar, Footer y Toast de aviso) a través de un <Outlet />.
 */
function LayoutPublico() {
  return (
    <TiendaLayout>
      <Outlet />
    </TiendaLayout>
  )
}

export default function App() {
  return (
    <Routes>
      {/* 1. Rutas públicas y de cliente (utilizan TiendaLayout) */}
      <Route element={<LayoutPublico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
        <Route path="/categorias" element={<Categorias />} />
        <Route path="/categorias/:categoria" element={<Categorias />} />
        <Route path="/ofertas" element={<Ofertas />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/compra-fallida" element={<CompraFallida />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route
          path="/mis-pedidos"
          element={
            <RutaProtegida>
              <MisPedidos />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<NoEncontrado />} />
      </Route>

      {/* 2. Rutas administrativas (desacopladas del layout público, utilizan AdminLayout) */}
      <Route
        path="/admin"
        element={
          <RutaProtegida roles={['admin', 'vendedor']}>
            <Admin />
          </RutaProtegida>
        }
      />
    </Routes>
  )
}
