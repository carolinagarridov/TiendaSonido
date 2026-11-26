import { describe, it, expect } from 'vitest';

const esCorreoValido = (correo) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);
const esRutValido = (rut) => rut && rut.length >= 8;

describe('Pruebas Unitarias - Validaciones de Formularios', () => {
  it('debe validar un correo electrónico correcto', () => {
    expect(esCorreoValido('cliente@sonidovivo.cl')).toBe(true);
  });

  it('debe rechazar un correo sin símbolo de arroba', () => {
    expect(esCorreoValido('clientesidovivo.cl')).toBe(false);
  });

  it('debe validar que el RUT cumpla con el largo mínimo', () => {
    expect(esRutValido('19245678-9')).toBe(true);
  });
});