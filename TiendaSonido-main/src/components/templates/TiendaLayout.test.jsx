import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import TiendaLayout from './TiendaLayout'

describe('<TiendaLayout /> Template', () => {
  it('renderiza la estructura con slots personalizados', () => {
    render(
      <TiendaLayout
        navbar={<nav>Barra de navegación de prueba</nav>}
        footer={<footer>Pie de página de prueba</footer>}
        aviso={<div>Aviso flotante de prueba</div>}
      >
        <div data-testid="contenido">Contenido principal de la página</div>
      </TiendaLayout>,
    )

    expect(screen.getByText('Barra de navegación de prueba')).toBeInTheDocument()
    expect(screen.getByTestId('contenido')).toHaveTextContent('Contenido principal de la página')
    expect(screen.getByText('Pie de página de prueba')).toBeInTheDocument()
    expect(screen.getByText('Aviso flotante de prueba')).toBeInTheDocument()
  })
})

