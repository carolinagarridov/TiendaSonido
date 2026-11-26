import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Route, Routes } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'
import { inicializarBaseDatos } from '../services/almacenamiento'
import { renderConApp } from '../test/utilidades'
import Login from './Login'

function app() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/admin" element={<p>Panel admin</p>} />
    </Routes>
  )
}

describe('<Login />', () => {
  beforeEach(() => inicializarBaseDatos())

  it('muestra error con credenciales incorrectas', async () => {
    renderConApp(app(), { ruta: '/login' })
    await userEvent.type(screen.getByLabelText(/correo/i), 'admin@sonidovivo.cl')
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'malaclave')
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(screen.getByRole('alert')).toHaveTextContent(/incorrectos/i)
  })

  it('el administrador entra y es enviado al panel', async () => {
    renderConApp(app(), { ruta: '/login' })
    await userEvent.type(screen.getByLabelText(/correo/i), 'admin@sonidovivo.cl')
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'admin123')
    await userEvent.click(screen.getByRole('button', { name: /ingresar/i }))
    expect(screen.getByText('Panel admin')).toBeInTheDocument()
    expect(JSON.parse(localStorage.getItem('usuarioSesion')).clave).toBeUndefined()
  })
})
