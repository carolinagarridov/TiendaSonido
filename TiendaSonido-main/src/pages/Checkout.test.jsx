import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import Checkout from './Checkout'

describe('<Checkout />', () => {
  it('informa que el carrito está vacío cuando no hay artículos', () => {
    localStorage.removeItem('carrito')
    renderConApp(<Checkout />, { ruta: '/checkout' })
    expect(screen.getByRole('heading', { name: /tu carrito está vacío/i })).toBeInTheDocument()
  })

  it('muestra el formulario de entrega y resumen cuando hay artículos en el carrito', () => {
    localStorage.setItem(
      'carrito',
      JSON.stringify([
        { codigo: 'GE001', nombre: 'Guitarra Test', precio: 100000, cantidad: 1, stock: 5 },
      ]),
    )
    renderConApp(<Checkout />, { ruta: '/checkout' })
    expect(screen.getByRole('heading', { name: /finalizar compra/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/despacho a domicilio/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/retiro en tienda/i)).toBeInTheDocument()
    expect(screen.getByText('Guitarra Test')).toBeInTheDocument()
  })
})

