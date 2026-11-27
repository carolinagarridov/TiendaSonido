// Capa de datos. Hoy usa localStorage; cuando tengan los microservicios Spring Boot,
// solo hay que cambiar estas funciones por llamadas fetch/axios a la API REST
// y el resto de la app (componentes y páginas) no cambia.
import { productosIniciales } from '../data/productos'
import { usuariosIniciales } from '../data/usuarios'

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

// Solo carga los datos iniciales si no existen (antes se sobrescribían en cada carga
// y se perdían los productos agregados desde el panel de administración).
export function inicializarBaseDatos() {
  if (!localStorage.getItem(CLAVES.productos)) guardar(CLAVES.productos, productosIniciales)
  if (!localStorage.getItem(CLAVES.usuarios)) guardar(CLAVES.usuarios, usuariosIniciales)
  if (!localStorage.getItem(CLAVES.pedidos)) guardar(CLAVES.pedidos, [])
}

export const obtenerProductos = () => leer(CLAVES.productos, productosIniciales)
export const guardarProductos = (productos) => guardar(CLAVES.productos, productos)

export const obtenerUsuarios = () => leer(CLAVES.usuarios, usuariosIniciales)
export const guardarUsuarios = (usuarios) => guardar(CLAVES.usuarios, usuarios)

export const obtenerPedidos = () => leer(CLAVES.pedidos, [])
export const guardarPedidos = (pedidos) => guardar(CLAVES.pedidos, pedidos)

export const obtenerCarrito = () => leer(CLAVES.carrito, [])
export const guardarCarrito = (carrito) => guardar(CLAVES.carrito, carrito)

export const obtenerSesion = () => leer(CLAVES.sesion, null)
export const guardarSesion = (usuario) => guardar(CLAVES.sesion, usuario)
export const borrarSesion = () => localStorage.removeItem(CLAVES.sesion)
