// Usuarios de prueba para poder entrar con cada rol mientras no exista el backend.
// OJO: en el backend real las claves se guardan con hash (BCrypt), nunca en texto plano.
export const ROLES = {
  ADMIN: 'admin',
  VENDEDOR: 'vendedor',
  CLIENTE: 'cliente',
}

export const NOMBRE_ROL = {
  admin: 'Administrador',
  vendedor: 'Vendedor',
  cliente: 'Cliente',
}

export const usuariosIniciales = [
  {
    run: '11111111-1',
    nombre: 'Admin',
    apellidos: 'Sonido Vivo',
    correo: 'admin@sonidovivo.cl',
    clave: 'admin123',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Av. Valparaíso 123',
    rol: 'admin',
    activo: true,
  },
  {
    run: '12345678-5',
    nombre: 'Vendedor',
    apellidos: 'Sonido Vivo',
    correo: 'vendedor@sonidovivo.cl',
    clave: 'vende123',
    region: 'Región de Valparaíso',
    comuna: 'Viña del Mar',
    direccion: 'Av. Valparaíso 123',
    rol: 'vendedor',
    activo: true,
  },
]
