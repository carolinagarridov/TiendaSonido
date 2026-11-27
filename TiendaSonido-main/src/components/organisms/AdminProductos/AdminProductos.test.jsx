import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AdminProductos from './AdminProductos'

describe('<AdminProductos /> Presentacional', () => {
  const productos = [
    {
      codigo: 'GA001',
      nombre: 'Guitarra Acústica',
      categoria: 'Guitarras Acústicas',
      marca: 'Fender',
      modelo: 'FA-125',
      precio: 149990,
      stock: 5,
      descripcion: 'Guitarra',
    },
  ]

  it('muestra la tabla de inventario', () => {
    render(
      <AdminProductos
        productos={productos}
        puedeEditarCatalogo={false}
        onCampoChange={() => {}}
        onAgregar={() => {}}
        onEliminar={() => {}}
        onCambiarStock={() => {}}
        onCerrarMensaje={() => {}}
      />,
    )
    expect(screen.getByText('Guitarra Acústica')).toBeInTheDocument()
    expect(screen.getByText('GA001')).toBeInTheDocument()
    expect(screen.queryByText(/agregar nuevo producto/i)).not.toBeInTheDocument()
  })

  it('muestra el formulario de agregar cuando puedeEditarCatalogo es true', () => {
    render(
      <AdminProductos
        productos={productos}
        puedeEditarCatalogo={true}
        onCampoChange={() => {}}
        onAgregar={() => {}}
        onEliminar={() => {}}
        onCambiarStock={() => {}}
        onCerrarMensaje={() => {}}
      />,
    )
    expect(screen.getByText(/agregar nuevo producto/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /guardar producto/i })).toBeInTheDocument()
  })

  it('permite cambiar el stock emitiendo callback', async () => {
    const onCambiarStock = vi.fn()
    render(
      <AdminProductos
        productos={productos}
        puedeEditarCatalogo={true}
        onCampoChange={() => {}}
        onAgregar={() => {}}
        onEliminar={() => {}}
        onCambiarStock={onCambiarStock}
        onCerrarMensaje={() => {}}
      />,
    )
    const stockInput = screen.getByLabelText(/stock de guitarra acústica/i)
    await userEvent.clear(stockInput)
    await userEvent.type(stockInput, '8')
    expect(onCambiarStock).toHaveBeenCalled()
  })
})

