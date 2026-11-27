import { screen } from '@testing-library/react'
import { Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import DetalleProducto from './DetalleProducto'

describe('<DetalleProducto />', () => {
  it('muestra mensaje de producto no encontrado para código inexistente', () => {
    renderConApp(
      <Routes>
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
      </Routes>,
      { ruta: '/productos/CODIGO_FALSO_123' },
    )
    expect(screen.getByRole('heading', { name: /producto no encontrado/i })).toBeInTheDocument()
  })

  it('muestra los datos completos para un producto válido del catálogo', () => {
    renderConApp(
      <Routes>
        <Route path="/productos/:codigo" element={<DetalleProducto />} />
      </Routes>,
      { ruta: '/productos/GE001' },
    )
    expect(screen.getByRole('heading', { name: 'Guitarra Eléctrica Stratocaster' })).toBeInTheDocument()
    expect(screen.getByText(/código: ge001/i)).toBeInTheDocument()
    expect(screen.getByText('$249.990')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /añadir al carrito/i })).toBeInTheDocument()
  })
})

