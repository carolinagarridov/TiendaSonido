import { describe, it, expect } from 'vitest';

describe('Pruebas Unitarias - Lógica del Carrito', () => {
  it('debe calcular el total sumando precios y cantidades', () => {
    const carrito = [
      { precio: 12000, cantidad: 2 },
      { precio: 15000, cantidad: 1 }
    ];
    const total = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    expect(total).toBe(39000);
  });

  it('debe detectar correctamente si un producto ya existe en el carrito', () => {
    const carrito = [{ codigo: 'GUIT01', cantidad: 1 }];
    const existe = carrito.some(item => item.codigo === 'GUIT01');
    expect(existe).toBe(true);
  });
});