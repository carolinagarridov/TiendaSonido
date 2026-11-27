import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import CompraFallida from './CompraFallida'

describe('<CompraFallida />', () => {
  it('muestra aviso de error y opciones de retorno', () => {
    renderConApp(<CompraFallida />, { ruta: '/compra-fallida' })
    expect(screen.getByRole('heading', { name: /no se pudo procesar tu compra/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /reintentar checkout/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /volver al carrito/i })).toBeInTheDocument()
  })
})
