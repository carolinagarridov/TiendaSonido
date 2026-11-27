import { useState } from 'react'
import { guardarProductos, obtenerProductos } from '../services/almacenamiento'

const VACIO = {
  codigo: '',
  nombre: '',
  categoria: '',
  marca: '',
  modelo: '',
  precio: '',
  stock: '',
  descripcion: '',
}

/**
 * Hook para la gestión de productos e inventario en el panel de administración.
 */
export function useAdminProductos() {
  const [productos, setProductos] = useState(() => obtenerProductos())
  const [form, setForm] = useState(VACIO)
  const [mensaje, setMensaje] = useState(null)

  function actualizar(lista) {
    setProductos(lista)
    guardarProductos(lista)
  }

  function cambiarCampo(name, value) {
    setForm((f) => ({ ...f, [name]: value }))
  }

  function agregar(e) {
    e.preventDefault()
    const codigo = form.codigo.trim().toUpperCase()
    if (productos.some((p) => p.codigo === codigo)) {
      setMensaje({ tipo: 'danger', texto: 'El código ingresado ya existe. Usa uno diferente.' })
      return
    }
    const nuevo = {
      ...form,
      codigo,
      nombre: form.nombre.trim(),
      marca: form.marca.trim(),
      modelo: form.modelo.trim(),
      descripcion: form.descripcion.trim(),
      precio: parseInt(form.precio, 10),
      stock: parseInt(form.stock, 10),
      imagen: `img/productos/${codigo}.jpg`,
    }
    actualizar([...productos, nuevo])
    setForm(VACIO)
    setMensaje({ tipo: 'success', texto: `Producto "${nuevo.nombre}" agregado.` })
  }

  function eliminar(codigo) {
    if (window.confirm(`¿Eliminar el producto ${codigo}?`)) {
      actualizar(productos.filter((p) => p.codigo !== codigo))
    }
  }

  function cambiarStock(codigo, valor) {
    const stock = Math.max(0, parseInt(valor, 10) || 0)
    actualizar(productos.map((p) => (p.codigo === codigo ? { ...p, stock } : p)))
  }

  function cerrarMensaje() {
    setMensaje(null)
  }

  return {
    productos,
    form,
    mensaje,
    cambiarCampo,
    agregar,
    eliminar,
    cambiarStock,
    cerrarMensaje,
  }
}

