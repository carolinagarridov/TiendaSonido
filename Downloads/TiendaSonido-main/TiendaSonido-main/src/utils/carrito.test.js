import { describe, expect, it } from 'vitest'
import { agregarItem, calcularTotal, cambiarCantidad, contarItems, descontarStock, quitarItem } from './carrito'

const guitarra = { codigo: 'GA001', nombre: 'Guitarra', precio: 100000, stock: 2, categoria: 'Guitarras Acústicas' }
const puas = { codigo: 'AC004', nombre: 'Púas', precio: 3990, stock: 50, categoria: 'Accesorios' }

describe('carrito', () => {
  it('agrega un producto nuevo con cantidad 1', () => {
    const { carrito, ok } = agregarItem([], guitarra)
    expect(ok).toBe(true)
    expect(carrito).toHaveLength(1)
    expect(carrito[0].cantidad).toBe(1)
  })

  it('suma cantidad si el producto ya está', () => {
    let { carrito } = agregarItem([], guitarra)
    ;({ carrito } = agregarItem(carrito, guitarra))
    expect(carrito[0].cantidad).toBe(2)
  })

  it('no permite superar el stock', () => {
    let { carrito } = agregarItem([], guitarra)
    ;({ carrito } = agregarItem(carrito, guitarra))
    const resultado = agregarItem(carrito, guitarra)
    expect(resultado.ok).toBe(false)
    expect(resultado.carrito[0].cantidad).toBe(2)
  })

  it('calcula total y cantidad de ítems', () => {
    let { carrito } = agregarItem([], guitarra)
    ;({ carrito } = agregarItem(carrito, puas))
    ;({ carrito } = agregarItem(carrito, puas))
    expect(calcularTotal(carrito)).toBe(100000 + 2 * 3990)
    expect(contarItems(carrito)).toBe(3)
  })

  it('quitar y cambiar cantidad a 0 eliminan el ítem', () => {
    const { carrito } = agregarItem([], guitarra)
    expect(quitarItem(carrito, 'GA001')).toEqual([])
    expect(cambiarCantidad(carrito, 'GA001', 0)).toEqual([])
  })

  it('descuenta stock al confirmar y falla si no alcanza', () => {
    const productos = [guitarra, puas]
    const nuevos = descontarStock(productos, [{ codigo: 'GA001', cantidad: 2 }])
    expect(nuevos.find((p) => p.codigo === 'GA001').stock).toBe(0)
    expect(descontarStock(productos, [{ codigo: 'GA001', cantidad: 3 }])).toBeNull()
  })
})
