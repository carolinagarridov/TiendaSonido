import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import AvisoCarrito from './AvisoCarrito'

describe('<AvisoCarrito />', () => {
  it('no muestra contenido cuando aviso es null', () => {
    render(<AvisoCarrito aviso={null} onCerrar={() => {}} />)
    // Con aviso null, el toast está oculto (show=false), sin texto visible
    expect(screen.queryByText(/./)).not.toBeInTheDocument()
  })

  it('muestra el texto del aviso cuando hay un aviso activo', () => {
    const aviso = { id: 1, texto: '¡Producto añadido!', tipo: 'success' }
    render(<AvisoCarrito aviso={aviso} onCerrar={() => {}} />)
    expect(screen.getByText('¡Producto añadido!')).toBeInTheDocument()
  })

  it('aplica la clase text-white cuando el tipo es success', () => {
    const aviso = { id: 3, texto: 'Añadido', tipo: 'success' }
    render(<AvisoCarrito aviso={aviso} onCerrar={() => {}} />)
    const body = screen.getByText('Añadido')
    expect(body).toHaveClass('text-white')
  })

  it('no llama a onCerrar hasta que se active el autohide', () => {
    const onCerrar = vi.fn()
    const aviso = { id: 2, texto: 'Stock insuficiente', tipo: 'warning' }
    render(<AvisoCarrito aviso={aviso} onCerrar={onCerrar} />)
    // El componente usa autohide (no hay botón de cierre explícito en el DOM)
    // Verificamos que onCerrar fue pasado correctamente como prop
    expect(screen.getByText('Stock insuficiente')).toBeInTheDocument()
    expect(onCerrar).not.toHaveBeenCalled()
  })
})
