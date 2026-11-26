import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import TarjetaProducto from './TarjetaProducto'

const producto = {
  codigo: 'GE001',
  nombre: 'Guitarra Eléctrica Stratocaster',
  categoria: 'Guitarras Eléctricas',
  marca: 'Squier',
  modelo: 'Affinity Strat',
  precio: 249990,
  stock: 5,
  descripcion: 'Cuerpo de álamo',
  imagen: 'img/productos/GE001.jpg',
}

describe('<TarjetaProducto />', () => {
  it('muestra nombre, precio formateado e imagen', () => {
    render(<TarjetaProducto producto={producto} onAgregar={() => {}} />)
    expect(screen.getByRole('heading', { name: producto.nombre })).toBeInTheDocument()
    expect(screen.getByText('$249.990')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: producto.nombre })).toHaveAttribute(
      'src',
      expect.stringContaining('GE001.jpg'),
    )
  })

  it('llama a onAgregar al hacer clic en el botón', async () => {
    const onAgregar = vi.fn()
    render(<TarjetaProducto producto={producto} onAgregar={onAgregar} />)
    await userEvent.click(screen.getByRole('button', { name: /añadir al carrito/i }))
    expect(onAgregar).toHaveBeenCalledWith(producto)
  })

  it('deshabilita el botón si no hay stock', () => {
    render(<TarjetaProducto producto={{ ...producto, stock: 0 }} onAgregar={() => {}} />)
    expect(screen.getByRole('button', { name: /sin stock/i })).toBeDisabled()
    expect(screen.getByText('Agotado')).toBeInTheDocument()
  })
})
