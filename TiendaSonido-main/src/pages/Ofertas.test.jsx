import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import Ofertas from './Ofertas'

describe('<Ofertas />', () => {
  it('renderiza el encabezado de ofertas', () => {
    renderConApp(<Ofertas />, { ruta: '/ofertas' })
    expect(screen.getByRole('heading', { name: /ofertas y promociones/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver todo el catálogo/i })).toBeInTheDocument()
  })
})
