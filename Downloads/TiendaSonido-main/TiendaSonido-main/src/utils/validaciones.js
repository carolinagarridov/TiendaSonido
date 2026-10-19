// Validaciones puras (sin React) para poder probarlas fácilmente con Vitest.

export function limpiarRun(run) {
  return String(run).replace(/[.\-\s]/g, '').toUpperCase()
}

// Valida RUN chileno con dígito verificador (módulo 11).
export function validarRun(run) {
  const limpio = limpiarRun(run)
  if (!/^\d{7,8}[0-9K]$/.test(limpio)) return false

  const cuerpo = limpio.slice(0, -1)
  const dv = limpio.slice(-1)

  let suma = 0
  let multiplo = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += Number(cuerpo[i]) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }
  const resto = 11 - (suma % 11)
  const dvEsperado = resto === 11 ? '0' : resto === 10 ? 'K' : String(resto)
  return dv === dvEsperado
}

export function formatearRun(run) {
  const limpio = limpiarRun(run)
  return `${limpio.slice(0, -1)}-${limpio.slice(-1)}`
}

export function validarCorreo(correo) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(correo).trim())
}

export function validarClave(clave) {
  return typeof clave === 'string' && clave.length >= 4 && clave.length <= 10
}

// Devuelve un objeto { campo: 'mensaje' }. Si está vacío, el formulario es válido.
export function validarRegistro(datos, usuariosExistentes = []) {
  const errores = {}

  if (!validarRun(datos.run)) {
    errores.run = 'RUN inválido. Revisa el número y el dígito verificador.'
  } else if (usuariosExistentes.some((u) => limpiarRun(u.run) === limpiarRun(datos.run))) {
    errores.run = 'Ya existe una cuenta con este RUN.'
  }

  if (!datos.nombre?.trim()) errores.nombre = 'El nombre es obligatorio.'
  else if (datos.nombre.trim().length > 50) errores.nombre = 'Máximo 50 caracteres.'

  if (!datos.apellidos?.trim()) errores.apellidos = 'Los apellidos son obligatorios.'
  else if (datos.apellidos.trim().length > 100) errores.apellidos = 'Máximo 100 caracteres.'

  if (!validarCorreo(datos.correo)) {
    errores.correo = 'Correo inválido.'
  } else if (
    usuariosExistentes.some((u) => u.correo.toLowerCase() === datos.correo.trim().toLowerCase())
  ) {
    errores.correo = 'Este correo ya está registrado.'
  }

  if (!validarClave(datos.clave)) errores.clave = 'La contraseña debe tener entre 4 y 10 caracteres.'
  if (datos.clave !== datos.confirmarClave) errores.confirmarClave = 'Las contraseñas no coinciden.'

  if (!datos.region) errores.region = 'Selecciona una región.'
  if (!datos.comuna) errores.comuna = 'Selecciona una comuna.'

  if (!datos.direccion?.trim()) errores.direccion = 'La dirección es obligatoria.'
  else if (datos.direccion.trim().length > 300) errores.direccion = 'Máximo 300 caracteres.'

  return errores
}
