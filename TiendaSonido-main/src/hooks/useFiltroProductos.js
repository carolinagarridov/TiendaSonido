import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { obtenerProductos } from '../services/almacenamiento'

/**
 * Hook para cargar y filtrar productos por búsqueda de texto y categoría,
 * con sincronización bidireccional de parámetros de búsqueda en la URL.
 */
export function useFiltroProductos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const paramCat = searchParams.get('categoria')
  const paramBusq = searchParams.get('busqueda')

  const [productos] = useState(() => obtenerProductos())
  const [categoria, setCategoriaState] = useState(paramCat || 'Todas')
  const [busqueda, setBusquedaState] = useState(paramBusq || '')

  useEffect(() => {
    if (paramCat && paramCat !== categoria) {
      setCategoriaState(paramCat)
    }
  }, [paramCat, categoria])

  useEffect(() => {
    if (paramBusq !== null && paramBusq !== busqueda) {
      setBusquedaState(paramBusq)
    }
  }, [paramBusq, busqueda])

  function setCategoria(cat) {
    setCategoriaState(cat)
    setSearchParams((prev) => {
      const nuevo = new URLSearchParams(prev)
      if (cat === 'Todas') nuevo.delete('categoria')
      else nuevo.set('categoria', cat)
      return nuevo
    })
  }

  function setBusqueda(txt) {
    setBusquedaState(txt)
    setSearchParams((prev) => {
      const nuevo = new URLSearchParams(prev)
      if (!txt) nuevo.delete('busqueda')
      else nuevo.set('busqueda', txt)
      return nuevo
    })
  }

  const filtrados = useMemo(() => {
    const texto = busqueda.trim().toLowerCase()
    return productos.filter(
      (p) =>
        (categoria === 'Todas' || p.categoria === categoria) &&
        (!texto ||
          `${p.nombre} ${p.marca} ${p.modelo}`.toLowerCase().includes(texto)),
    )
  }, [productos, categoria, busqueda])

  return {
    productos,
    filtrados,
    categoria,
    setCategoria,
    busqueda,
    setBusqueda,
  }
}
