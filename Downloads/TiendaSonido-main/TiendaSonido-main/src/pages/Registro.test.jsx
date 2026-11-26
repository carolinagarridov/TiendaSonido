import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { renderConApp } from '../test/utilidades'
import Registro from './Registro'

describe('<Registro />', () => {
  it('muestra errores si se envía vacío', async () => {
    renderConApp(<Registro />, { ruta: '/registro' })
    await userEvent.click(screen.getByRole('button', { name: /registrar/i }))
    expect(screen.getByText(/RUN inválido/i)).toBeInTheDocument()
    expect(screen.getByText(/selecciona una región/i)).toBeInTheDocument()
  })

  it('carga las comunas al elegir una región', async () => {
    renderConApp(<Registro />, { ruta: '/registro' })
    const comuna = screen.getByLabelText('Comuna')
    expect(comuna).toBeDisabled()
    await userEvent.selectOptions(screen.getByLabelText('Región'), 'Región de Valparaíso')
    expect(comuna).toBeEnabled()
    expect(screen.getByRole('option', { name: 'Viña del Mar' })).toBeInTheDocument()
  })
})
