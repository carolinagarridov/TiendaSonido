import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import Categorias from './Categorias'

describe('<Categorias />', () => {
  it('muestra el listado de categorías con sus nombres', () => {
    renderConApp(<Categorias />, { ruta: '/categorias' })
    expect(screen.getByRole('heading', { name: /explora por categorías/i })).toBeInTheDocument()
    expect(screen.getByText('Guitarras Eléctricas')).toBeInTheDocument()
    expect(screen.getByText('Bajos Eléctricos')).toBeInTheDocument()
  })
})

