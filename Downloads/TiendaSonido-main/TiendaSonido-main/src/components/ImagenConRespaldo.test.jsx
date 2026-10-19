import { fireEvent, render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import ImagenConRespaldo from './ImagenConRespaldo'

it('cambia a la imagen de respaldo si la original no carga', () => {
  render(<ImagenConRespaldo src="img/productos/NO-EXISTE.jpg" respaldo="img/categorias/baterias.svg" alt="foto" />)
  const img = screen.getByAltText('foto')
  expect(img.getAttribute('src')).toContain('NO-EXISTE.jpg')
  fireEvent.error(img)
  expect(img.getAttribute('src')).toContain('baterias.svg')
})
