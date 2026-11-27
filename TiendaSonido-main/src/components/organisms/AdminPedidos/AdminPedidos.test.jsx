import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AdminPedidos from './AdminPedidos'

describe('<AdminPedidos /> Presentacional', () => {
  const pedidos = [
    {
      numero: 101,
      fecha: '2026-10-25T10:00:00.000Z',
      cliente: { nombre: 'Juan Pérez', correo: 'juan@test.cl' },
      entrega: { tipo: 'despacho', direccion: 'Calle 1 #23' },
      total: 50000,
      estado: 'En preparación',
    },
  ]

  it('muestra mensaje cuando no hay pedidos', () => {
    render(<AdminPedidos pedidos={[]} onCambiarEstado={() => {}} />)
    expect(screen.getByText('Todavía no hay pedidos.')).toBeInTheDocument()
  })

  it('muestra la información de los pedidos', () => {
    render(<AdminPedidos pedidos={pedidos} onCambiarEstado={() => {}} />)
    expect(screen.getByText('101')).toBeInTheDocument()
    expect(screen.getByText('Juan Pérez')).toBeInTheDocument()
    expect(screen.getByText('$50.000')).toBeInTheDocument()
  })

  it('llama a onCambiarEstado al cambiar el selector', async () => {
    const onCambiarEstado = vi.fn()
    render(<AdminPedidos pedidos={pedidos} onCambiarEstado={onCambiarEstado} />)
    const select = screen.getByLabelText(/estado del pedido 101/i)
    await userEvent.selectOptions(select, 'Despachado')
    expect(onCambiarEstado).toHaveBeenCalledWith(101, 'Despachado')
  })
})
