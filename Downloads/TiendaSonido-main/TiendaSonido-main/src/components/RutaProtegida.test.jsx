import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import RutaProtegida from './RutaProtegida'

function rutas() {
  return (
    <Routes>
      <Route path="/" element={<p>Inicio</p>} />
      <Route path="/login" element={<p>Pantalla login</p>} />
      <Route
        path="/admin"
        element={
          <RutaProtegida roles={['admin']}>
            <p>Panel secreto</p>
          </RutaProtegida>
        }
      />
    </Routes>
  )
}

describe('<RutaProtegida />', () => {
  it('sin sesión redirige al login', () => {
    renderConApp(rutas(), { ruta: '/admin' })
    expect(screen.getByText('Pantalla login')).toBeInTheDocument()
  })

  it('con rol incorrecto redirige al inicio', () => {
    localStorage.setItem('usuarioSesion', JSON.stringify({ nombre: 'Ana', correo: 'a@a.cl', rol: 'cliente' }))
    renderConApp(rutas(), { ruta: '/admin' })
    expect(screen.getByText('Inicio')).toBeInTheDocument()
  })

  it('con el rol correcto muestra el contenido', () => {
    localStorage.setItem('usuarioSesion', JSON.stringify({ nombre: 'Admin', correo: 'x@x.cl', rol: 'admin' }))
    renderConApp(rutas(), { ruta: '/admin' })
    expect(screen.getByText('Panel secreto')).toBeInTheDocument()
  })
})
