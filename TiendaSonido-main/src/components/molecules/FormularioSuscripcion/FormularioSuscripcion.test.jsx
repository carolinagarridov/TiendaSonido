import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import FormularioSuscripcion from './FormularioSuscripcion'

describe('<FormularioSuscripcion />', () => {
  it('muestra el campo de texto, botón y mensaje', () => {
    render(
      <FormularioSuscripcion
        correo="test@correo.cl"
        onCorreoChange={() => {}}
        onSubmit={() => {}}
        mensaje="¡Gracias por suscribirte!"
      />,
    )
    expect(screen.getByDisplayValue('test@correo.cl')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /suscribirme/i })).toBeInTheDocument()
    expect(screen.getByText('¡Gracias por suscribirte!')).toBeInTheDocument()
  })

  it('llama a onSubmit al enviar el formulario', async () => {
    const onSubmit = vi.fn((e) => e.preventDefault())
    render(
      <FormularioSuscripcion
        correo="test@correo.cl"
        onCorreoChange={() => {}}
        onSubmit={onSubmit}
      />,
    )
    await userEvent.click(screen.getByRole('button', { name: /suscribirme/i }))
    expect(onSubmit).toHaveBeenCalled()
  })
})

