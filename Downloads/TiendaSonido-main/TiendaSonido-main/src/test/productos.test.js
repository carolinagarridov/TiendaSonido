import { describe, it, expect } from 'vitest';
import { productosMock } from './mocks/productosMock';

describe('Pruebas Unitarias - Catálogo de Productos', () => {
  it('debe cargar correctamente la lista mock de productos', () => {
    expect(productosMock).toHaveLength(2);
    expect(productosMock[0].nombre).toContain('Fender');
  });

  it('debe verificar que todos los productos tengan stock mayor a cero', () => {
    const todosConStock = productosMock.every(p => p.stock > 0);
    expect(todosConStock).toBe(true);
  });
});