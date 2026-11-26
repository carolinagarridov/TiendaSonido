# TiendaSonido – backend modular

Spring Boot 4.2 + Java 25. Una sola aplicación (puerto `8080`) organizada en "microservicios"
internos desacoplados, listos para extraerse a procesos separados más adelante:

```
com.TiendaSonido.TiendaSonido
├── autenticacion/   login, registro, perfil → JWT
├── usuarios/        entidad Usuario, roles, CRUD (ADMIN)
├── catalogo/        entidad Producto, CRUD (ADMIN/VENDEDOR)
├── pedidos/         Pedido + PedidoItem, boletas, estados, descuento de stock
├── seguridad/       JwtService, filtro, UserDetails, manejo 401/403
├── config/          SecurityConfig, OpenApiConfig, DataSeeder, CORS
└── common/          errores HTTP consistentes
```

## Ejecutar

```bash
cd backend/TiendaSonido
mvn spring-boot:run
# o: mvn -DskipTests package && java -jar target/TiendaSonido-0.0.1-SNAPSHOT.jar
```

- Swagger UI: http://localhost:8080/swagger-ui.html → botón **Authorize** y pega el token.
- H2 console: http://localhost:8080/h2-console (`jdbc:h2:mem:tiendasonido`, usuario `sa`).
- Perfil MySQL: `mvn spring-boot:run -Dspring-boot.run.profiles=mysql`.

## Credenciales sembradas

| Rol | Correo | Clave |
|---|---|---|
| ADMIN | admin@sonidovivo.cl | admin123 |
| VENDEDOR | vendedor@sonidovivo.cl | vende123 |
| CLIENTE | cliente@sonidovivo.cl | cliente123 |

## Variables de entorno

| Variable | Default | Uso |
|---|---|---|
| `JWT_SECRET` | valor de desarrollo (base64) | firma HS256 (mínimo 32 bytes) |
| `JWT_EXPIRATION_MS` | `86400000` | vigencia del token |
| `CORS_ALLOWED_ORIGINS` | `http://localhost:5173,http://127.0.0.1:5173` | orígenes Vite |
| `MYSQL_URL` | `jdbc:mysql://localhost:3306/tiendasonido?...` | solo perfil mysql |
| `MYSQL_USER` / `MYSQL_PASSWORD` | `root` / vacía | solo perfil mysql |

## Decisiones de seguridad

- Contraseñas con BCrypt; nunca se devuelven en las respuestas.
- `/auth/**` y `GET /productos` son públicos; el resto exige JWT.
- `POST /boletas` es de cualquier usuario autenticado; `GET/GET/{numero}/PATCH` de pedidos
  y todo `/usuarios` exigen ADMIN o VENDEDOR según corresponda.
- El total de la boleta se recalcula en el servidor y el stock se descuenta en una transacción.
