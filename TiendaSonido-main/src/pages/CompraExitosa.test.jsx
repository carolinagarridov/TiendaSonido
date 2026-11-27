import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import CompraExitosa from './CompraExitosa'

describe('<CompraExitosa />', () => {
  it('muestra aviso si no hay pedido en el estado de navegación', () => {
    renderConApp(<CompraExitosa />, { ruta: '/compra-exitosa' })
    expect(screen.getByRole('heading', { name: /confirmación de compra/i })).toBeInTheDocument()
  })
})

