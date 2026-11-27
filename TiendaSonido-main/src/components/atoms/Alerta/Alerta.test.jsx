import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import Alerta from './Alerta'

describe('<Alerta />', () => {
  it('no renderiza nada si no hay children', () => {
    const { container } = render(<Alerta />)
    expect(container).toBeEmptyDOMElement()
  })

  it('muestra el mensaje con la variante especificada', () => {
    render(<Alerta variant="danger">Ocurrió un error</Alerta>)
    const alerta = screen.getByRole('alert')
    expect(alerta).toHaveTextContent('Ocurrió un error')
    expect(alerta).toHaveClass('alert-danger')
  })

  it('permite cerrar la alerta cuando es dismissible', async () => {
    const onClose = vi.fn()
    render(
      <Alerta variant="success" dismissible onClose={onClose}>
        Éxito total
      </Alerta>,
    )
    const botonCerrar = screen.getByRole('button', { name: /close/i })
    await userEvent.click(botonCerrar)
    expect(onClose).toHaveBeenCalled()
  })
})

