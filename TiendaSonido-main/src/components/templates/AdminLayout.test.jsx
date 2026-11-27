import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import AdminLayout from './AdminLayout'

describe('<AdminLayout /> Template Presentacional', () => {
  it('muestra título, rol de sesión y pestañas para admin', () => {
    render(
      <MemoryRouter>
        <AdminLayout
          rolLabel="Administrador"
          esAdmin={true}
          tabPedidos={<div>Contenido Pedidos</div>}
          tabProductos={<div>Contenido Productos</div>}
          tabUsuarios={<div>Contenido Usuarios</div>}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('heading', { name: /panel de administración/i })).toBeInTheDocument()
    expect(screen.getByText(/rol: administrador/i)).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /pedidos/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /productos/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /usuarios/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /volver a la tienda/i })).toBeInTheDocument()
  })

  it('no muestra la pestaña de usuarios si esAdmin es false', () => {
    render(
      <MemoryRouter>
        <AdminLayout
          rolLabel="Vendedor"
          esAdmin={false}
          tabPedidos={<div>Contenido Pedidos</div>}
          tabProductos={<div>Contenido Productos</div>}
          tabUsuarios={<div>Contenido Usuarios</div>}
        />
      </MemoryRouter>,
    )

    expect(screen.getByRole('tab', { name: /pedidos/i })).toBeInTheDocument()
    expect(screen.getByRole('tab', { name: /productos/i })).toBeInTheDocument()
    expect(screen.queryByRole('tab', { name: /usuarios/i })).not.toBeInTheDocument()
  })
})
