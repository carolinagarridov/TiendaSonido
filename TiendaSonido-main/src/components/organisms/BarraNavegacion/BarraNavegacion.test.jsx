import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it, vi } from 'vitest'
import BarraNavegacion from './BarraNavegacion'

describe('<BarraNavegacion /> Presentacional', () => {
  it('muestra enlaces de login y registro cuando no hay usuario', () => {
    render(
      <MemoryRouter>
        <BarraNavegacion usuario={null} cantidadItems={0} onCerrarSesion={() => {}} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /iniciar sesión/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /registrarse/i })).toBeInTheDocument()
    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('0')
  })

  it('muestra saludo y menú de usuario cuando hay sesión iniciada', async () => {
    const onCerrarSesion = vi.fn()
    const usuario = { nombre: 'Martín', correo: 'martin@test.cl', rol: 'cliente' }

    render(
      <MemoryRouter>
        <BarraNavegacion usuario={usuario} cantidadItems={3} onCerrarSesion={onCerrarSesion} />
      </MemoryRouter>,
    )

    expect(screen.getByText(/hola, martín/i)).toBeInTheDocument()
    expect(screen.getByTestId('contador-carrito')).toHaveTextContent('3')

    // Abrir menú de usuario y cerrar sesión
    await userEvent.click(screen.getByText(/hola, martín/i))
    const btnCerrar = screen.getByText(/cerrar sesión/i)
    await userEvent.click(btnCerrar)
    expect(onCerrarSesion).toHaveBeenCalledTimes(1)
  })

  it('muestra el enlace de Administración para administradores', () => {
    const usuario = { nombre: 'Admin', correo: 'admin@sonidovivo.cl', rol: 'admin' }
    render(
      <MemoryRouter>
        <BarraNavegacion usuario={usuario} cantidadItems={0} onCerrarSesion={() => {}} />
      </MemoryRouter>,
    )
    expect(screen.getByRole('link', { name: /administración/i })).toBeInTheDocument()
  })
})

