import { useState } from 'react'
import { rutaPublica } from '../utils/imagenes'

// Muestra `src`; si la imagen no existe (404), cambia a `respaldo` una sola vez.
export default function ImagenConRespaldo({ src, respaldo, alt, as: Componente = 'img', ...props }) {
  const [fallo, setFallo] = useState(false)
  const actual = fallo || !src ? respaldo : src

  return (
    <Componente
      src={rutaPublica(actual)}
      alt={alt}
      onError={() => {
        if (!fallo) setFallo(true)
      }}
      {...props}
    />
  )
}
