import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import AdminUsuarios from './AdminUsuarios'

describe('<AdminUsuarios /> Presentacional', () => {
  const usuarios = [
    {
      nombre: 'Administrador',
      apellidos: 'Principal',
      correo: 'admin@sonidovivo.cl',
      rol: 'admin',
      activo: true,
    },
    {
      nombre: 'Pedro',
      apellidos: 'Vendedor',
      correo: 'pedro@sonidovivo.cl',
      rol: 'vendedor',
      activo: true,
    },
  ]
  const usuarioActual = { correo: 'admin@sonidovivo.cl' }

  it('muestra la tabla de usuarios y el formulario de creación', () => {
    render(
      <AdminUsuarios
        usuarios={usuarios}
        usuarioActual={usuarioActual}
        onCampoChange={() => {}}
        onCrear={() => {}}
        onEditar={() => {}}
      />,
    )
    expect(screen.getByText('Crear usuario')).toBeInTheDocument()
    expect(screen.getByText('admin@sonidovivo.cl')).toBeInTheDocument()
    expect(screen.getByText('pedro@sonidovivo.cl')).toBeInTheDocument()
  })

  it('deshabilita edición de rol y botón desactivar para el usuario en sesión', () => {
    render(
      <AdminUsuarios
        usuarios={usuarios}
        usuarioActual={usuarioActual}
        onCampoChange={() => {}}
        onCrear={() => {}}
        onEditar={() => {}}
      />,
    )
    const selectAdmin = screen.getByLabelText(/rol de admin@sonidovivo.cl/i)
    expect(selectAdmin).toBeDisabled()

    const selectPedro = screen.getByLabelText(/rol de pedro@sonidovivo.cl/i)
    expect(selectPedro).toBeEnabled()
  })

  it('llama a onEditar cuando se desactiva un usuario', async () => {
    const onEditar = vi.fn()
    render(
      <AdminUsuarios
        usuarios={usuarios}
        usuarioActual={usuarioActual}
        onCampoChange={() => {}}
        onCrear={() => {}}
        onEditar={onEditar}
      />,
    )
    // El botón Desactivar para Pedro
    const botonesDesactivar = screen.getAllByRole('button', { name: /desactivar/i })
    await userEvent.click(botonesDesactivar[1]) // El segundo botón (el primero está disabled para admin)
    expect(onEditar).toHaveBeenCalledWith('pedro@sonidovivo.cl', { activo: false })
  })
})

