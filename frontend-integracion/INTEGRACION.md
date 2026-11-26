# Integración del frontend React (rama `rayenn`) con el backend

Estos archivos están listos para **copiar** al proyecto React que vive en la rama `rayenn`
(`Downloads/TiendaSonido-main/TiendaSonido-main/`). No hice checkout, commit ni push de esa rama.

## 1. Arrancar el backend

```bash
cd backend/TiendaSonido
mvn spring-boot:run
```

Por defecto usa **H2 en memoria** y siembra 51 productos + 3 usuarios.

- Swagger UI: http://localhost:8080/swagger-ui.html
- OpenAPI JSON: http://localhost:8080/v3/api-docs
- H2 console: http://localhost:8080/h2-console (JDBC `jdbc:h2:mem:tiendasonido`, user `sa`)

## 2. Copiar los archivos al proyecto React

| Archivo de esta carpeta | Destino en la rama `rayenn` |
|---|---|
| `.env.example` | `Downloads/TiendaSonido-main/TiendaSonido-main/.env` (renombrarlo a `.env`) |
| `src/services/almacenamiento.js` | `src/services/almacenamiento.js` (reemplaza) |
| `src/pages/Login.jsx` | `src/pages/Login.jsx` (reemplaza; espera el resultado async del login) |
| `src/pages/admin/AdminUsuarios.jsx` | `src/pages/admin/AdminUsuarios.jsx` (reemplaza) |
| `src/pages/admin/AdminPedidos.jsx` | `src/pages/admin/AdminPedidos.jsx` (reemplaza) |
| `src/pages/MisPedidos.jsx` | `src/pages/MisPedidos.jsx` (reemplaza) |

No necesitas cambiar `AuthContext.jsx`, `Registro.jsx`, `Carrito.jsx` ni
`AdminProductos.jsx`: el `loginApi` devuelve `{ token, ...usuario }`, `AuthContext` ya guarda
esa respuesta en `usuarioSesion`, y el nuevo `almacenamiento.js` envía
`Authorization: Bearer <token>` en las llamadas protegidas.

Luego:

```bash
npm install
npm run dev      # http://localhost:5173
```

Si el backend no está corriendo, las pantallas siguen funcionando con `localStorage` como respaldo.

## 3. Usuarios de prueba

| Rol | Correo | Clave |
|---|---|---|
| ADMIN | `admin@sonidovivo.cl` | `admin123` |
| VENDEDOR | `vendedor@sonidovivo.cl` | `vende123` |
| CLIENTE | `cliente@sonidovivo.cl` | `cliente123` |

## 4. Endpoints consumidos

| Método | Ruta | Acceso |
|---|---|---|
| POST | `/api/v1/auth/login` | público → devuelve JWT |
| POST | `/api/v1/auth/registro` | público (Cliente por defecto) |
| GET | `/api/v1/auth/perfil` | autenticado |
| GET | `/api/v1/productos` | público |
| GET | `/api/v1/productos/{id}` | público |
| POST / PUT / DELETE | `/api/v1/productos[/\{id\}]` | ADMIN o VENDEDOR |
| POST | `/api/v1/boletas` | autenticado (descuenta stock) |
| GET | `/api/v1/boletas/mias` | autenticado |
| GET | `/api/v1/boletas` | ADMIN o VENDEDOR |
| PATCH | `/api/v1/boletas/{numero}/estado?estado=...` | ADMIN o VENDEDOR |
| GET / POST / PUT / DELETE | `/api/v1/usuarios[/\{id\}]` | solo ADMIN |

## 5. Producción / MySQL

```bash
mvn spring-boot:run -Dspring-boot.run.profiles=mysql
```

Variables: `MYSQL_URL`, `MYSQL_USER`, `MYSQL_PASSWORD`, `JWT_SECRET`, `CORS_ALLOWED_ORIGINS`.
