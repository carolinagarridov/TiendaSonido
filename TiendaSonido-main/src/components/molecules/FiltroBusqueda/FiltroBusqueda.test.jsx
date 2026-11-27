import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FiltroBusqueda from './FiltroBusqueda'

describe('<FiltroBusqueda />', () => {
  const categorias = ['Guitarras Eléctricas', 'Bajos Eléctricos']

  it('renderiza el input de búsqueda y el selector de categoría', () => {
    render(
      <FiltroBusqueda
        busqueda=""
        onBusquedaChange={() => { }}
        categoria="Todas"
        onCategoriaChange={() => { }}
        categorias={categorias}
      />,
    )
    expect(screen.getByPlaceholderText(/buscar por nombre/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /categorías/i })).toBeInTheDocument()
  })

  it('emite el cambio de búsqueda al escribir', async () => {
    const onBusquedaChange = vi.fn()
    render(
      <FiltroBusqueda
        busqueda=""
        onBusquedaChange={onBusquedaChange}
        categoria="Todas"
        onCategoriaChange={() => { }}
        categorias={categorias}
      />,
    )
    const input = screen.getByPlaceholderText(/buscar por nombre/i)
    await userEvent.type(input, 'fender')
    expect(onBusquedaChange).toHaveBeenCalled()
  })
})

