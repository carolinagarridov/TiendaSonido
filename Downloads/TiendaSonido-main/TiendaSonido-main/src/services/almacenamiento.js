import { productosIniciales } from '../data/productos'
import { usuariosIniciales } from '../data/usuarios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1'

const CLAVES = {
  productos: 'db_productos',
  usuarios: 'db_usuarios',
  pedidos: 'db_pedidos',
  carrito: 'carrito',
  sesion: 'usuarioSesion',
}

function leer(clave, porDefecto) {
  try {
    const valor = localStorage.getItem(clave)
    return valor ? JSON.parse(valor) : porDefecto
  } catch {
    return porDefecto
  }
}

function guardar(clave, valor) {
  localStorage.setItem(clave, JSON.stringify(valor))
}
export async function sincronizarProductosDesdeApi() {
  try {
    const res = await fetch(`${API_URL}/productos`)
    if (!res.ok) throw new Error('Error al consultar API')
    const data = await res.json()
    const adaptados = data.map((p) => ({
      ...p,
      categoria: typeof p.categoria === 'object' ? p.categoria.nombre : p.categoria,
      imagen: p.imagen || `/img/${p.codigo}.jpg`,
    }))
    guardar(CLAVES.productos, adaptados)
    return adaptados
  } catch {
    return leer(CLAVES.productos, productosIniciales)
  }
}

export function inicializarBaseDatos() {
  if (!localStorage.getItem(CLAVES.productos)) guardar(CLAVES.productos, productosIniciales)
  if (!localStorage.getItem(CLAVES.usuarios)) guardar(CLAVES.usuarios, usuariosIniciales)
  if (!localStorage.getItem(CLAVES.pedidos)) guardar(CLAVES.pedidos, [])
  sincronizarProductosDesdeApi()
}

export const obtenerProductos = () => leer(CLAVES.productos, productosIniciales)

export async function guardarProductos(productos) {
  guardar(CLAVES.productos, productos)
}
export async function crearProductoApi(producto) {
  const res = await fetch(`${API_URL}/productos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })
  if (!res.ok) throw new Error('No se pudo guardar el producto en la base de datos')
  const creado = await res.json()
  await sincronizarProductosDesdeApi()
  return creado
}

export async function actualizarProductoApi(id, producto) {
  const res = await fetch(`${API_URL}/productos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(producto),
  })
  if (!res.ok) throw new Error('No se pudo actualizar el producto')
  const actualizado = await res.json()
  await sincronizarProductosDesdeApi()
  return actualizado
}

export async function eliminarProductoApi(id) {
  const res = await fetch(`${API_URL}/productos/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('No se pudo eliminar el producto')
  await sincronizarProductosDesdeApi()
}

export async function loginApi(correo, clave) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ correo, clave }),
  })
  if (!res.ok) return null
  return await res.json()
}

export async function registrarUsuarioApi(usuario) {
  const res = await fetch(`${API_URL}/auth/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ...usuario, rol: usuario.rol.toUpperCase() }),
  })
  if (!res.ok) throw new Error('No se pudo registrar en el servidor')
  return await res.json()
}

export async function guardarPedidoApi(pedido) {
  const res = await fetch(`${API_URL}/boletas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(pedido),
  })
  if (!res.ok) throw new Error('No se pudo registrar la boleta en la base de datos')
  return await res.json()
}

export const obtenerUsuarios = () => leer(CLAVES.usuarios, usuariosIniciales)
export const guardarUsuarios = (usuarios) => guardar(CLAVES.usuarios, usuarios)

export const obtenerPedidos = () => leer(CLAVES.pedidos, [])
export const guardarPedidos = (pedidos) => guardar(CLAVES.pedidos, pedidos)

export const obtenerCarrito = () => leer(CLAVES.carrito, [])
export const guardarCarrito = (carrito) => guardar(CLAVES.carrito, carrito)

export const obtenerSesion = () => leer(CLAVES.sesion, null)
export const guardarSesion = (usuario) => guardar(CLAVES.sesion, usuario)
export const borrarSesion = () => localStorage.removeItem(CLAVES.sesion)



