import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
// Primero Bootstrap y después nuestros estilos, para poder sobrescribirlo
import 'bootstrap/dist/css/bootstrap.min.css'
import './estilos.css'
import App from './App'
import { AuthProvider } from './context/AuthContext'
import { CarritoProvider } from './context/CarritoContext'
import { inicializarBaseDatos } from './services/almacenamiento'

inicializarBaseDatos()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CarritoProvider>
          <App />
        </CarritoProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
