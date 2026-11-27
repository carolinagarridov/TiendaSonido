# Sonido Vivo – Frontend React (DSY1104 Forma B)

SPA en **React + Vite + React Bootstrap**, con pruebas en **Vitest + Testing Library**.

## Cómo correrlo

```bash
npm install        # solo la primera vez
npm run dev        # abre http://localhost:5173
npm test           # pruebas en modo watch
npm run test:run   # pruebas una sola vez
npm run build      # versión de producción en /dist
npm run lint       # análisis de código con oxlint
```

## Usuarios de prueba

| Rol           | Correo                  | Clave    |
|---------------|-------------------------|----------|
| Administrador | admin@sonidovivo.cl     | admin123 |
| Vendedor      | vendedor@sonidovivo.cl  | vende123 |
| Cliente       | (regístrate en /registro) |        |

> Para volver a los datos iniciales: DevTools → Application → Local Storage → borrar todo.

## Imágenes

- Fotos de productos: `public/img/productos/<CODIGO>.jpg` (ej. `GA001.jpg`).
  Si falta una, se muestra la imagen de su categoría (`public/img/categorias/*.svg`).
- Banner de inicio: `public/img/hero-banner.jpg` (si no existe usa `hero-banner.svg`).

## Arquitectura y Estructura (Atomic Design & Container/Presentational)

El proyecto está organizado siguiendo la metodología **Atomic Design** y el patrón **Container / Presentational**:

```
src/
  main.jsx                        Punto de entrada (Bootstrap + Router + contextos)
  App.jsx                         Rutas y composición de templates
  estilos.css                     Estilos propios sobre Bootstrap
  components/
    atoms/                        Componentes visuales primitivos (Alerta, Boton, BadgeEstado, ImagenConRespaldo)
    molecules/                    Combinación de átomos (TarjetaProducto, AvisoCarrito, FiltroBusqueda, FormularioSuscripcion, ItemCarrito)
    organisms/                    Secciones visuales completas y presentacionales (BarraNavegacion, PiePagina, GrillaProductos, AdminPedidos, AdminProductos, AdminUsuarios, ListaCarrito, ResumenPedido)
    templates/                    Estructura y distribución de página (TiendaLayout, AdminLayout)
  containers/                     Componentes contenedores que conectan datos/contextos con la presentación (BarraNavegacionContainer, AdminPedidosContainer, AdminProductosContainer, AdminUsuariosContainer, AvisoCarritoContainer)
  hooks/                          Hooks personalizados para desacoplar lógica de negocio (useFiltroProductos, useAdminPedidos, useAdminProductos, useAdminUsuarios)
  context/                        AuthContext (sesión y roles) y CarritoContext (carro y avisos)
  guards/                         Guardias de navegación (RutaProtegida)
  pages/                          Páginas concretas de la aplicación (Inicio, Productos, Login, Registro, Carrito, MisPedidos, Admin)
  services/                       Acceso a datos y persistencia (almacenamiento.js)
  utils/                          Utilidades puras (validaciones, cálculo de carrito, pedidos, formato, imágenes)
  data/                           Catálogo base, regiones y usuarios iniciales
  test/                           Mocks y suites de pruebas unitarias
```

## Roles

- **Administrador**: pedidos, productos (agregar/eliminar/stock) y usuarios (crear, rol, activar/desactivar).
- **Vendedor**: pedidos (cambiar estado) y stock. No ve usuarios.
- **Cliente**: catálogo, carrito, confirmar pedido (despacho o retiro) y ver *sus* pedidos.
