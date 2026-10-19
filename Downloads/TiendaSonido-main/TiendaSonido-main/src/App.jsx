import { Route, Routes } from 'react-router-dom'
import AvisoCarrito from './components/AvisoCarrito'
import BarraNavegacion from './components/BarraNavegacion'
import PiePagina from './components/PiePagina'
import RutaProtegida from './components/RutaProtegida'
import Carrito from './pages/Carrito'
import Inicio from './pages/Inicio'
import Login from './pages/Login'
import MisPedidos from './pages/MisPedidos'
import NoEncontrado from './pages/NoEncontrado'
import Productos from './pages/Productos'
import Registro from './pages/Registro'
import Admin from './pages/admin/Admin'

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <BarraNavegacion />
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route
            path="/mis-pedidos"
            element={
              <RutaProtegida>
                <MisPedidos />
              </RutaProtegida>
            }
          />
          <Route
            path="/admin"
            element={
              <RutaProtegida roles={['admin', 'vendedor']}>
                <Admin />
              </RutaProtegida>
            }
          />
          <Route path="*" element={<NoEncontrado />} />
        </Routes>
      </main>
      <PiePagina />
      <AvisoCarrito />
    </div>
  )
}
