import { describe, expect, it } from 'vitest'
import { formatearRun, validarClave, validarCorreo, validarRegistro, validarRun } from './validaciones'

describe('validarRun', () => {
  it('acepta RUN válidos con o sin puntos y guion', () => {
    expect(validarRun('11111111-1')).toBe(true)
    expect(validarRun('12.345.678-5')).toBe(true)
    expect(validarRun('123456785')).toBe(true)
  })

  it('rechaza dígito verificador incorrecto', () => {
    expect(validarRun('12345678-9')).toBe(false)
  })

  it('rechaza formatos inválidos', () => {
    expect(validarRun('')).toBe(false)
    expect(validarRun('abc')).toBe(false)
    expect(validarRun('123')).toBe(false)
  })

  it('formatea el RUN con guion', () => {
    expect(formatearRun('12.345.678-5')).toBe('12345678-5')
  })
})

describe('validarCorreo y validarClave', () => {
  it('valida correos', () => {
    expect(validarCorreo('javier@duoc.cl')).toBe(true)
    expect(validarCorreo('sin-arroba.cl')).toBe(false)
  })

  it('exige clave de 4 a 10 caracteres', () => {
    expect(validarClave('123')).toBe(false)
    expect(validarClave('1234')).toBe(true)
    expect(validarClave('12345678901')).toBe(false)
  })
})

describe('validarRegistro', () => {
  const datosValidos = {
    run: '12345678-5',
    nombre: 'Javier',
    apellidos: 'Álvarez',
    correo: 'javier@duoc.cl',
    clave: 'abcd1234',
    confirmarClave: 'abcd1234',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Calle 123',
  }

  it('no devuelve errores con datos válidos', () => {
    expect(validarRegistro(datosValidos)).toEqual({})
  })

  it('detecta contraseñas distintas', () => {
    const errores = validarRegistro({ ...datosValidos, confirmarClave: 'otra' })
    expect(errores.confirmarClave).toBeDefined()
  })

  it('detecta correo duplicado', () => {
    const errores = validarRegistro(datosValidos, [{ run: '11111111-1', correo: 'JAVIER@duoc.cl' }])
    expect(errores.correo).toMatch(/ya está registrado/)
  })
})
