import { productosIniciales } from '../data/productos'
import { usuariosIniciales } from '../data/usuarios'

const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1').replace(/\/$/, '')

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

/** El token se guarda dentro de usuarioSesion al hacer login/registro. */
export function obtenerToken() {
  const sesion = leer(CLAVES.sesion, null)
  return sesion?.token || localStorage.getItem('token') || null
}

async function peticion(ruta, { metodo = 'GET', cuerpo, autenticado = false } = {}) {
  const headers = { 'Content-Type': 'application/json' }
  if (autenticado) {
    const token = obtenerToken()
    if (token) headers.Authorization = `Bearer ${token}`
  }

  const respuesta = await fetch(`${API_URL}${ruta}`, {
    method: metodo,
    headers,
    ...(cuerpo === undefined ? {} : { body: JSON.stringify(cuerpo) }),
  })

  if (!respuesta.ok) {
    let mensaje = `Error ${respuesta.status} al llamar ${ruta}`
    try {
      const datos = await respuesta.json()
      if (datos?.mensaje) mensaje = datos.mensaje
    } catch {
      // respuesta sin cuerpo JSON
    }
    throw new Error(mensaje)
  }

  if (respuesta.status === 204) return null
  return respuesta.json()
}

// ------------------------- Catálogo -------------------------

export async function sincronizarProductosDesdeApi() {
  try {
    const data = await peticion('/productos')
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
  const creado = await peticion('/productos', { metodo: 'POST', cuerpo: producto, autenticado: true })
  await sincronizarProductosDesdeApi()
  return creado
}

export async function actualizarProductoApi(id, producto) {
  const actualizado = await peticion(`/productos/${id}`, {
    metodo: 'PUT',
    cuerpo: producto,
    autenticado: true,
  })
  await sincronizarProductosDesdeApi()
  return actualizado
}

export async function eliminarProductoApi(id) {
  await peticion(`/productos/${id}`, { metodo: 'DELETE', autenticado: true })
  await sincronizarProductosDesdeApi()
}

// ------------------------- Autenticación -------------------------

export async function loginApi(correo, clave) {
  // En pruebas no hay backend: se usa el mismo fallback local de siempre.
  if (import.meta.env.VITEST) return null
  try {
    return await peticion('/auth/login', {
      metodo: 'POST',
      cuerpo: { correo, clave },
    })
  } catch {
    return null
  }
}

export async function registrarUsuarioApi(usuario) {
  return peticion('/auth/registro', {
    metodo: 'POST',
    cuerpo: { ...usuario, rol: (usuario.rol || 'cliente').toUpperCase() },
  })
}

export async function obtenerPerfilApi() {
  return peticion('/auth/perfil', { autenticado: true })
}

// ------------------------- Usuarios (ADMIN) -------------------------

const enMinusculas = (u) => ({ ...u, rol: String(u.rol || 'cliente').toLowerCase() })

export async function obtenerUsuariosApi() {
  const datos = await peticion('/usuarios', { autenticado: true })
  const adaptados = datos.map(enMinusculas)
  guardar(CLAVES.usuarios, adaptados)
  return adaptados
}

export async function crearUsuarioApi(usuario) {
  const creado = await peticion('/usuarios', {
    metodo: 'POST',
    cuerpo: { ...usuario, rol: String(usuario.rol || 'cliente').toUpperCase() },
    autenticado: true,
  })
  await obtenerUsuariosApi()
  return enMinusculas(creado)
}

export async function actualizarUsuarioApi(id, cambios) {
  const actualizado = await peticion(`/usuarios/${id}`, {
    metodo: 'PUT',
    cuerpo: {
      ...cambios,
      rol: cambios.rol ? String(cambios.rol).toUpperCase() : undefined,
      clave: cambios.clave || undefined,
    },
    autenticado: true,
  })
  await obtenerUsuariosApi()
  return enMinusculas(actualizado)
}

export async function eliminarUsuarioApi(id) {
  await peticion(`/usuarios/${id}`, { metodo: 'DELETE', autenticado: true })
  await obtenerUsuariosApi()
}

// ------------------------- Pedidos / boletas -------------------------

export async function guardarPedidoApi(pedido) {
  return peticion('/boletas', { metodo: 'POST', cuerpo: pedido, autenticado: true })
}

export async function obtenerPedidosApi() {
  const datos = await peticion('/boletas', { autenticado: true })
  guardar(CLAVES.pedidos, datos)
  return datos
}

export async function obtenerMisPedidosApi() {
  const datos = await peticion('/boletas/mias', { autenticado: true })
  const existentes = leer(CLAVES.pedidos, [])
  const otros = existentes.filter((p) => !datos.some((d) => d.numero === p.numero))
  guardar(CLAVES.pedidos, [...datos, ...otros])
  return datos
}

export async function cambiarEstadoPedidoApi(numero, estado) {
  const actualizado = await peticion(
    `/boletas/${numero}/estado?estado=${encodeURIComponent(estado)}`,
    { metodo: 'PATCH', autenticado: true },
  )
  await obtenerPedidosApi()
  return actualizado
}

// ------------------------- LocalStorage (fallback / carrito) -------------------------

export const obtenerUsuarios = () => leer(CLAVES.usuarios, usuariosIniciales)
export const guardarUsuarios = (usuarios) => guardar(CLAVES.usuarios, usuarios)

export const obtenerPedidos = () => leer(CLAVES.pedidos, [])
export const guardarPedidos = (pedidos) => guardar(CLAVES.pedidos, pedidos)

export const obtenerCarrito = () => leer(CLAVES.carrito, [])
export const guardarCarrito = (carrito) => guardar(CLAVES.carrito, carrito)

export const obtenerSesion = () => leer(CLAVES.sesion, null)
export const guardarSesion = (usuario) => guardar(CLAVES.sesion, usuario)
export const borrarSesion = () => {
  localStorage.removeItem(CLAVES.sesion)
  localStorage.removeItem('token')
}
