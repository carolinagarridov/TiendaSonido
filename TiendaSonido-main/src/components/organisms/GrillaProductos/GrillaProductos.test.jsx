import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import GrillaProductos from './GrillaProductos'

describe('<GrillaProductos />', () => {
  const productos = [
    {
      codigo: 'GA001',
      nombre: 'Guitarra Acústica Fender',
      categoria: 'Guitarras Acústicas',
      marca: 'Fender',
      modelo: 'FA-125',
      precio: 149990,
      stock: 3,
      descripcion: 'Guitarra acústica folk',
      imagen: 'img/productos/GA001.jpg',
    },
  ]

  it('muestra el mensaje de vacío si no hay productos', () => {
    render(
      <MemoryRouter>
        <GrillaProductos productos={[]} onAgregar={() => { }} mensajeVacio="Sin resultados" />
      </MemoryRouter>,
    )
    expect(screen.getByText('Sin resultados')).toBeInTheDocument()
  })

  it('muestra las tarjetas de productos cuando hay elementos', () => {
    render(
      <MemoryRouter>
        <GrillaProductos productos={productos} onAgregar={() => { }} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Guitarra Acústica Fender')).toBeInTheDocument()
    expect(screen.getByText('GA001')).toBeInTheDocument()
  })
})
