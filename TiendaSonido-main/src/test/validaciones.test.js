import { describe, expect, it } from 'vitest'
import { validarCorreo, validarRun } from '../utils/validaciones'

describe('Pruebas Unitarias - Validaciones de Entrada', () => {
  it('debe validar correctamente el formato de correo electrónico', () => {
    expect(validarCorreo('usuario@duoc.cl')).toBe(true)
    expect(validarCorreo('invalido-sin-arroba')).toBe(false)
  })

  it('debe validar correctamente el formato y dígito verificador de RUN', () => {
    expect(validarRun('12345678-5')).toBe(true)
    expect(validarRun('11111111-1')).toBe(true)
    expect(validarRun('12345678-9')).toBe(false)
    expect(validarRun('123')).toBe(false)
    expect(validarRun('')).toBe(false)
  })
})

