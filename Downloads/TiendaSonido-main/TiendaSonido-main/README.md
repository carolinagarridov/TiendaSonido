# Sonido Vivo – Frontend React (DSY1104 Forma B)

SPA en **React + Vite + React Bootstrap**, con pruebas en **Vitest + Testing Library**.

## Cómo correrlo

```bash
npm install        # solo la primera vez
npm run dev        # abre http://localhost:5173
npm test           # pruebas en modo watch
npm run test:run   # pruebas una sola vez
npm run build      # versión de producción en /dist
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

## Estructura

```
src/
  main.jsx               Punto de entrada (Bootstrap + Router + contextos)
  App.jsx                Rutas
  estilos.css            Estilos propios sobre Bootstrap
  components/            Navbar, footer, tarjeta de producto, ruta protegida…
  context/               AuthContext (sesión/roles) y CarritoContext
  pages/                 Inicio, Productos, Login, Registro, Carrito, MisPedidos
  pages/admin/           Panel: pedidos, productos/stock, usuarios
  services/almacenamiento.js   Acceso a datos (hoy localStorage → mañana API REST)
  utils/                 Validaciones (RUN, correo…), lógica del carrito y pedidos
  data/                  Productos, regiones y usuarios iniciales
  **/*.test.js(x)        Pruebas Vitest
```

## Roles

- **Administrador**: pedidos, productos (agregar/eliminar/stock) y usuarios (crear, rol, activar/desactivar).
- **Vendedor**: pedidos (cambiar estado) y stock. No ve usuarios.
- **Cliente**: catálogo, carrito, confirmar pedido (despacho o retiro) y ver *sus* pedidos.
