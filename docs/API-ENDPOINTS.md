# Casa IA Desk — Documentación de API para Frontend

> **Propósito:** Referencia completa de endpoints para construir el frontend. Cada sección describe **qué hace el endpoint**, **cuándo usarlo en la UI** y **qué datos enviar/recibir**.

**Base URL:** `http://localhost:3000` (puerto por defecto, configurable con `PORT`)

**Formato:** JSON en request y response.

**Autenticación:** JWT vía `POST /auth/login` (ver sección Auth). Guardar `access_token` y enviarlo como `Authorization: Bearer <token>` en endpoints protegidos (`GET /auth/me`). El resto de endpoints aún reciben IDs (`user_id`, `client_id`, etc.) según el rol activo en sesión.

---

## Convenciones generales

| Aspecto | Detalle |
|---------|---------|
| **Listados** | `GET` devuelve `{ data, total, limit, offset }` |
| **Paginación** | Query params: `offset` (default `0`), `limit` (default `10`, máx. `100`) |
| **Crear** | `POST` con body JSON |
| **Actualizar** | `PATCH` con campos parciales (todos opcionales) |
| **Eliminar** | `DELETE` — hard delete en casi todo; **soft delete solo en `/users`** |
| **IDs** | UUID string en la mayoría; `specialties` y `memberships` usan integer; `delivery-tracking` usa bigint (string en JSON) |
| **Fechas** | ISO 8601 (`2026-06-12T20:00:00.000Z`) |
| **Decimales** | Llegan como string desde PostgreSQL (`"19.99"`) — parsear en frontend |
| **Relaciones** | Las respuestas **no incluyen objetos anidados** (solo IDs foráneos). El frontend debe hacer fetch cruzado o combinar datos en estado global |

### Respuesta de listado (ejemplo)

```json
{
  "data": [{ "id": "uuid...", "email": "cliente@mail.com" }],
  "total": 42,
  "limit": 25,
  "offset": 0
}
```

**Query params de paginación (todos los listados):**

| Param | Default | Máximo | Descripción |
|-------|---------|--------|-------------|
| `offset` | `0` | — | Registros a saltar (ej. `25` para página 2 con limit=25) |
| `limit` | `10` | `100` | Cantidad por página (ej. `limit=100`) |

Ejemplos:
- Primera página de 25: `?offset=0&limit=25`
- Segunda página de 25: `?offset=25&limit=25`
- Hasta 100 items: `?offset=0&limit=100`

**Storefront** (`GET /companies/:id/storefront`): pagina solo los productos dentro de `products: { data, total, limit, offset }`.

### Respuesta de error (404)

```json
{
  "statusCode": 404,
  "message": "User #uuid not found",
  "error": "Not Found"
}
```

---

## Roles de usuario (`users.role`)

| Valor | Perfil | Pantallas principales |
|-------|--------|----------------------|
| `cliente` | Compra productos, pide servicios, deja reseñas | Home, catálogo, carrito, mis pedidos, solicitar servicio, comunidad, chat |
| `profesional` | Ofrece servicios por especialidad | Panel de ofertas, solicitudes cercanas, perfil profesional, disponibilidad |
| `empresa` | Vende productos | Catálogo de productos, pedidos recibidos, perfil empresa |
| `administrador` | Gestión interna | Panel admin, usuarios, membresías, moderación |

Un `user` puede tener **un perfil extendido** según su rol: `clients`, `professionals`, `companies` o `admins` (relación 1:1 con `user_id`).

---

## Valores de estado (VARCHAR — validar en frontend)

### `orders.status`
| Valor | UI sugerida |
|-------|-------------|
| `carrito` | Badge gris — carrito activo, botón "Pagar" |
| `pagado` | Badge azul — confirmación de pago |
| `enviado` | Badge amarillo — en tránsito |
| `entregado` | Badge verde — completado |
| `cancelado` | Badge rojo — pedido cancelado |

### `service_requests.status`
| Valor | UI sugerida |
|-------|-------------|
| `pendiente` | Esperando ofertas de profesionales |
| `aceptado` | Oferta seleccionada |
| `rechazado` | Sin profesional / rechazado |
| `en_progreso` | Servicio en curso (mapa, chat) |
| `completado` | Listo para calificar |
| `calificado` | Cerrado con reseña |
| `cancelado` | Cancelado por cliente o sistema |

### `transactions.status`
| Valor | UI sugerida |
|-------|-------------|
| `pendiente` | Spinner / "Procesando pago" |
| `completado` | Check verde |
| `fallido` | Error rojo, botón reintentar |

### `deliveries.status`
| Valor | UI sugerida |
|-------|-------------|
| `pendiente` | Sin repartidor asignado |
| `asignado` | Repartidor confirmado |
| `en_camino` | Mapa en vivo con tracking |
| `entregado` | Entrega confirmada |
| `cancelado` | Entrega cancelada |

### `messages.type`
| Valor | UI sugerida |
|-------|-------------|
| `texto` | Burbuja de chat normal |
| `imagen` | Preview de imagen (`file_url`) |
| `archivo` | Chip descargable (`file_url`) |

### `memberships.plan`
`basico` · `hogar` · `familiar` · `premium`

### `vehicles.type`
Default: `camioneta`. Otros valores libres en string.

---

## Flujos de negocio → Pantallas sugeridas

### 1. Registro e inicio de sesión
1. `POST /users` — crear cuenta (email, password, role, nombre)
2. Según rol, crear perfil:
   - Cliente → `POST /clients`
   - Profesional → `POST /professionals` + `POST /professional-specialties`
   - Empresa → `POST /companies`
   - Admin → `POST /admins`

### 2. E-commerce (cliente)
1. `GET /products/active` — grid de productos con `image_url`
2. `POST /orders` — crear pedido (`status: carrito`)
3. `POST /order-items` — agregar productos al carrito
4. `PATCH /orders/:id` — actualizar total, cambiar a `pagado`, setear `paid_at`
5. `POST /transactions` — registrar pago
6. `GET /deliveries?...` — seguir entrega
7. `GET /delivery-tracking?...` — puntos GPS en mapa
8. `POST /reviews` — calificar producto (`product_id`)

### 3. Marketplace de servicios (cliente ↔ profesional)
1. `GET /specialties` — selector de categoría
2. `POST /service-requests` — publicar necesidad (título, descripción, dirección, emergencia)
3. `GET /service-offers?...` — cliente ve ofertas recibidas
4. `POST /service-offers` — profesional envía cotización (`price`, `message`)
5. `PATCH /service-offers/:id` — marcar `is_accepted: true`
6. `POST /service-assignments` — formalizar trabajo aceptado
7. `PATCH /service-assignments/:id` — `started_at`, `completed_at`
8. `POST /reviews` — calificar servicio (`service_assignment_id`)
9. `POST /transactions` — pago del servicio

### 4. Comunidad
1. `GET /community-posts` — feed de publicaciones
2. `POST /community-posts` — crear post (título, contenido, fotos[])
3. `GET /post-comments?...` — comentarios de un post (filtrar en frontend por `post_id`)
4. `POST /post-comments` — comentar

### 5. Mensajería
1. `POST /conversations` — abrir chat
2. `POST /conversation-participants` — agregar usuarios al chat
3. `GET /messages?...` — historial (filtrar por `conversation_id` en frontend)
4. `POST /messages` — enviar mensaje
5. `PATCH /messages/:id` — marcar `is_read: true`

### 6. Membresías
1. `GET /memberships` — planes disponibles
2. `POST /user-memberships` — suscribir usuario
3. `GET /user-memberships/:id` — estado de suscripción, `expires_at`, `auto_renew`

### 7. Delivery / repartidor
1. `GET /vehicles?...` — flota del conductor
2. `POST /deliveries` — asignar entrega a pedido
3. `POST /route-waypoints` — paradas intermedias
4. `POST /delivery-tracking` — ping GPS periódico desde app del repartidor
5. `PATCH /deliveries/:id` — actualizar estado y tiempos

---

## Endpoints por módulo

---

### 🔐 Auth — `/auth`

Login real con JWT (bcrypt). El token se guarda en el cliente y se envía como `Authorization: Bearer <token>`.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/auth/register` | Alta de usuario (hashea password con bcrypt) |
| `POST` | `/auth/login` | **Pantalla de login** — valida email + password, devuelve token y user |
| `GET` | `/auth/me` | Usuario actual a partir del token (header `Authorization`) |

**POST `/auth/login` body:**

```json
{ "email": "demo@cliente.com", "password": "demo123" }
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJ...",
  "user": {
    "id": "uuid",
    "email": "demo@cliente.com",
    "role": "cliente",
    "first_name": "María",
    "last_name": "González",
    "avatar_url": "https://i.pravatar.cc/150?u=demo-cliente"
  }
}
```

- Credenciales inválidas → `401 Unauthorized`.
- `GET /auth/me` requiere header `Authorization: Bearer <access_token>`; sin token o expirado → `401`.
- JWT payload: `{ sub: user.id, email, role }`. Expira en `JWT_EXPIRES_IN` (default `7d`).

**Usuarios demo (tras `npm run seed:reset`)** — password `demo123`:

| Rol | Email |
|-----|-------|
| Cliente | `demo@cliente.com` |
| Empresa | `tienda@empresa.com` |
| Profesional | `carlos.fontaneria@demo.com` (y otros `*.@demo.com`) |

---

### 👤 Users — `/users`

Gestión de cuentas base. Toda persona en la app tiene un registro aquí.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/users` | **Registro** — formulario de alta con email, contraseña, rol y datos personales |
| `GET` | `/users` | **Admin: listado de usuarios** paginado |
| `GET` | `/users/:id` | **Perfil de usuario** — avatar, nombre, ciudad, coordenadas |
| `PATCH` | `/users/:id` | **Editar perfil** — actualizar teléfono, avatar, ubicación, activar/desactivar |
| `DELETE` | `/users/:id` | **Eliminar cuenta** (soft delete — no aparece en listados) |

**POST body (`CreateUserDto`):**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `email` | string | ✅ | Input email, único |
| `password_hash` | string | ✅ | Contraseña (hash en prod; por ahora string) |
| `role` | string | ✅ | Select: `cliente`, `profesional`, `empresa`, `administrador` |
| `first_name` | string | ✅ | Nombre |
| `last_name` | string | ✅ | Apellido |
| `phone` | string | | Teléfono |
| `avatar_url` | string | | URL foto de perfil |
| `is_active` | boolean | | Toggle cuenta activa (default `true`) |
| `lat`, `lng` | number | | Geolocalización |
| `city` | string | | Ciudad |

**Response incluye además:** `id`, `created_at`, `updated_at`, `deleted_at`

---

### 🛒 Clients — `/clients`

Perfil extendido del **cliente**. Vinculado 1:1 a un `user`.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/clients` | Completar registro cliente tras crear user |
| `GET` | `/clients` | Admin: listado de clientes |
| `GET` | `/clients/:id` | Ver perfil cliente — dirección, puntos |
| `PATCH` | `/clients/:id` | Actualizar dirección o saldo de puntos |
| `DELETE` | `/clients/:id` | Eliminar perfil cliente |

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `user_id` | UUID | ✅ | ID del user logueado |
| `address` | string | | Dirección principal |
| `points_balance` | int | | Puntos de fidelidad (default `0`) |

---

### 🔧 Professionals — `/professionals`

Perfil del **profesional** de servicios a domicilio.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/professionals` | Onboarding profesional |
| `GET` | `/professionals` | **Buscar profesionales** — cards con rating, precio, disponibilidad |
| `GET` | `/professionals/available` | **Servicios destacados** — solo `is_available=true`, incluye `user` sin password |
| `GET` | `/professionals/by-specialty/:slug` | **Profesionales por categoría Home** — ej. `fontaneria`, `emergencia` |
| `GET` | `/professionals/by-user/:userId` | Perfil del profesional logueado |
| `GET` | `/professionals/:id` | **Perfil público** — bio, años exp., rating, radio de servicio |
| `PATCH` | `/professionals/:id` | Editar perfil, toggle disponibilidad, ajustar precio base |
| `DELETE` | `/professionals/:id` | Eliminar perfil |

**GET `/professionals/available`** y **`GET /professionals/by-specialty/:slug`** — query: `offset`, `limit`. Respuesta paginada `{ data, total, limit, offset }`; cada item incluye `user` sin `password_hash`.

**GET `/professionals/by-specialty/:slug`** — slugs del Home: `electricidad`, `fontaneria`, `jardineria`, `pintura`, `remodelacion`, `emergencia`.

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `user_id` | UUID | ✅ | User vinculado |
| `bio` | string | | Textarea "Sobre mí" |
| `years_experience` | int | | Años de experiencia |
| `base_price` | number | | Precio base referencial |
| `avg_rating` | number | | Promedio 0–5 (sistema lo actualiza) |
| `total_reviews` | int | | Contador reseñas |
| `is_available` | boolean | | Toggle "Disponible ahora" |
| `service_radius_km` | number | | Slider radio de cobertura (default 20 km) |

---

### 🏢 Companies — `/companies`

Perfil de **empresa** vendedora de productos.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/companies` | Registro empresa |
| `GET` | `/companies` | Listado empresas / marketplace |
| `GET` | `/companies/:id` | Página de tienda — nombre comercial, logo, RUC |
| `PATCH` | `/companies/:id` | Editar datos comerciales |
| `DELETE` | `/companies/:id` | Eliminar empresa |

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `user_id` | UUID | ✅ | User vinculado |
| `commercial_name` | string | ✅ | Nombre de la tienda |
| `ruc` | string | | Identificador fiscal (único) |
| `logo_url` | string | | Logo de la empresa |

---

### 🛡️ Admins — `/admins`

Perfil de **administrador** del sistema.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/admins` | Crear admin |
| `GET` | `/admins` | Listado admins |
| `GET` | `/admins/:id` | Detalle admin |
| `PATCH` | `/admins/:id` | Cambiar `permission_level` |
| `DELETE` | `/admins/:id` | Eliminar admin |

**POST body:** `user_id` (UUID, req), `permission_level` (int, default 1)

---

### 📂 Specialties — `/specialties`

Categorías de servicios (plomería, electricidad, etc.).

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/specialties` | Admin: crear categoría |
| `GET` | `/specialties` | **Grid/chips de categorías** en home y formulario de solicitud |
| `GET` | `/specialties/slug/:slug` | **Resolver categoría Home** por slug (ej. `fontaneria`) |
| `GET` | `/specialties/:id` | Detalle categoría |
| `PATCH` | `/specialties/:id` | Admin: editar |
| `DELETE` | `/specialties/:id` | Admin: eliminar |

**POST body:** `name` (req), `slug` (req, único), `description`

**ID:** integer (no UUID)

---

### 🔗 Professional Specialties — `/professional-specialties`

Relación **profesional ↔ especialidad** (tabla pivote).

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/professional-specialties` | Profesional selecciona sus oficios al registrarse |
| `GET` | `/professional-specialties` | Filtrar profesionales por especialidad |
| `GET` | `/professional-specialties/:professional_id/:specialty_id` | Ver relación específica |
| `PATCH` | `/professional-specialties/:professional_id/:specialty_id` | Marcar especialidad principal |
| `DELETE` | `/professional-specialties/:professional_id/:specialty_id` | Quitar especialidad |

**POST body:** `professional_id` (UUID), `specialty_id` (int), `is_primary` (boolean)

**Sin `id` propio** — clave compuesta.

---

### 📦 Products — `/products`

Catálogo de productos de empresas. Las imágenes se guardan en **`image_url`** (URL pública de Supabase Storage u otra CDN).

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/products` | Empresa: crear producto |
| `GET` | `/products` | Listado admin / paginado general |
| `GET` | `/products/active` | **Catálogo cliente** — solo activos, búsqueda opcional |
| `GET` | `/products/by-company/:companyId` | **Mi catálogo (empresa)** — productos activos de la tienda |
| `GET` | `/products/:id` | Detalle producto |
| `PATCH` | `/products/:id/image` | Asignar URL de imagen tras upload a Supabase |
| `PATCH` | `/products/:id` | Editar precio, stock, activar/desactivar |
| `DELETE` | `/products/:id` | Eliminar producto |

**GET `/products`** — query: `offset`, `limit`, `q` (nombre, descripción o empresa)

**GET `/products/active`** — query: `offset`, `limit`, `q` (nombre, descripción o `commercial_name` de la empresa)

**GET `/products/by-company/:companyId`** — query: `offset`, `limit`, `q` (nombre o descripción del producto)

**PATCH `/products/:id/image`** — body: `{ "image_url": "https://..." }`

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `company_id` | UUID | ✅ | Empresa dueña |
| `name` | string | ✅ | Nombre producto |
| `description` | string | | Descripción larga |
| `image_url` | string | | URL imagen (Supabase Storage) |
| `price` | number | ✅ | Precio |
| `stock` | int | | Inventario |
| `avg_rating` | number | | Rating promedio |
| `is_active` | boolean | | Visible en tienda |

**Response incluye:** `id`, `image_url`, y demás columnas de la entidad.

**Servicio interno (sin endpoint aún):** `updateStock(id, delta)` — ajusta inventario validando `stock >= 0`.

---

### 🧾 Orders — `/orders`

Pedidos de compra (carrito → entrega).

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/orders` | **Crear carrito/pedido** vacío para un cliente |
| `GET` | `/orders` | **Mis pedidos** — historial con badges de estado |
| `GET` | `/orders/:id` | **Detalle pedido** — total, items, estado, fecha pago |
| `PATCH` | `/orders/:id` | Cambiar estado, actualizar total, registrar `paid_at` |
| `DELETE` | `/orders/:id` | Cancelar/eliminar pedido |

**POST body:** `client_id` (req), `status` (default `carrito`), `total`, `paid_at`

**Response incluye:** `created_at`

---

### 📋 Order Items — `/order-items`

Líneas individuales dentro de un pedido.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/order-items` | **Agregar al carrito** — producto + cantidad |
| `GET` | `/order-items` | Listar items (filtrar por `order_id` en frontend) |
| `GET` | `/order-items/:id` | Detalle de línea |
| `PATCH` | `/order-items/:id` | Cambiar cantidad o recalcular subtotal |
| `DELETE` | `/order-items/:id` | **Quitar del carrito** |

**POST body:** `order_id`, `product_id`, `quantity`, `unit_price`, `subtotal` (todos req excepto los IDs que son req)

---

### 📣 Service Requests — `/service-requests`

Solicitudes de servicio publicadas por clientes.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/service-requests` | **Formulario "Necesito un servicio"** |
| `GET` | `/service-requests` | Cliente: mis solicitudes / Profesional: solicitudes disponibles |
| `GET` | `/service-requests/:id` | Detalle con mapa, descripción, estado |
| `PATCH` | `/service-requests/:id` | Cambiar estado del flujo |
| `DELETE` | `/service-requests/:id` | Cancelar solicitud |

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `client_id` | UUID | ✅ | Cliente autor |
| `specialty_id` | int | ✅ | Categoría del servicio |
| `title` | string | ✅ | Título corto |
| `description` | string | ✅ | Detalle del problema |
| `address` | string | ✅ | Dirección del servicio |
| `status` | string | | Default `pendiente` |
| `is_emergency` | boolean | | Toggle urgencia 🚨 |
| `preferred_date` | ISO date | | Date picker fecha preferida |

---

### 💬 Service Offers — `/service-offers`

Cotizaciones que envían profesionales a una solicitud.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/service-offers` | **Profesional: enviar cotización** con precio y mensaje |
| `GET` | `/service-offers` | **Cliente: comparar ofertas** recibidas |
| `GET` | `/service-offers/:id` | Detalle de una oferta |
| `PATCH` | `/service-offers/:id` | Aceptar oferta (`is_accepted: true`) |
| `DELETE` | `/service-offers/:id` | Retirar oferta |

**POST body:** `service_request_id`, `professional_id`, `price` (req), `message`, `is_accepted`

> Un profesional solo puede tener **una oferta por solicitud** (unique compuesto en BD).

---

### ✅ Service Assignments — `/service-assignments`

Trabajo formalizado cuando el cliente acepta una oferta.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/service-assignments` | Confirmar contratación |
| `GET` | `/service-assignments` | Listado de trabajos activos/completados |
| `GET` | `/service-assignments/:id` | Detalle — precio final, fechas inicio/fin |
| `PATCH` | `/service-assignments/:id` | Profesional: marcar inicio/fin de trabajo |
| `DELETE` | `/service-assignments/:id` | Cancelar asignación |

**POST body:** `service_request_id`, `service_offer_id`, `professional_id`, `client_id`, `final_price` (req), `started_at`, `completed_at`

---

### ⭐ Reviews — `/reviews`

Reseñas de productos o servicios.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/reviews` | **Modal de calificación** — estrellas 1–5 + comentario |
| `GET` | `/reviews` | Listado reseñas (filtrar por producto o servicio) |
| `GET` | `/reviews/:id` | Detalle reseña |
| `PATCH` | `/reviews/:id` | Editar reseña propia |
| `DELETE` | `/reviews/:id` | Eliminar reseña |

**POST body:**

| Campo | Tipo | Req | Regla UI |
|-------|------|-----|----------|
| `reviewer_id` | UUID | ✅ | Usuario que califica |
| `service_assignment_id` | UUID | | **XOR:** calificar servicio |
| `product_id` | UUID | | **XOR:** calificar producto |
| `rating` | int 1–5 | ✅ | Componente estrellas |
| `comment` | string | | Textarea opcional |

> Enviar **solo uno** de `service_assignment_id` o `product_id`.

---

### 💳 Memberships — `/memberships`

Planes de suscripción disponibles.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/memberships` | Admin: crear plan |
| `GET` | `/memberships` | **Página de planes** — cards con precio y beneficios |
| `GET` | `/memberships/:id` | Detalle plan |
| `PATCH` | `/memberships/:id` | Admin: editar plan |
| `DELETE` | `/memberships/:id` | Admin: eliminar plan |

**POST body:** `plan` (req, único: `basico`|`hogar`|`familiar`|`premium`), `name`, `price`, `duration_days`, `description`

**ID:** integer

---

### 🎫 User Memberships — `/user-memberships`

Suscripciones activas de usuarios.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/user-memberships` | **Checkout de membresía** |
| `GET` | `/user-memberships` | Admin: suscriptores |
| `GET` | `/user-memberships/:id` | **Mi plan** — fecha expiración, auto-renovación |
| `PATCH` | `/user-memberships/:id` | Toggle `auto_renew`, extender `expires_at` |
| `DELETE` | `/user-memberships/:id` | Cancelar suscripción |

**POST body:** `user_id`, `membership_id`, `expires_at` (req), `auto_renew`

---

### 📰 Community Posts — `/community-posts`

Publicaciones del feed comunitario.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/community-posts` | **Crear publicación** — texto + fotos |
| `GET` | `/community-posts` | **Feed principal** — scroll infinito |
| `GET` | `/community-posts/:id` | Detalle post |
| `PATCH` | `/community-posts/:id` | Editar post propio |
| `DELETE` | `/community-posts/:id` | Eliminar post |

**POST body:** `user_id` (req), `title`, `content` (req), `photos` (string[])

---

### 💭 Post Comments — `/post-comments`

Comentarios en publicaciones.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/post-comments` | **Input de comentario** bajo cada post |
| `GET` | `/post-comments` | Cargar comentarios (filtrar por `post_id`) |
| `GET` | `/post-comments/:id` | Detalle |
| `PATCH` | `/post-comments/:id` | Editar comentario |
| `DELETE` | `/post-comments/:id` | Eliminar comentario |

**POST body:** `post_id`, `user_id`, `content` (todos req)

---

### 💬 Conversations — `/conversations`

Contenedor de chats (sin participantes ni mensajes).

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/conversations` | **Iniciar chat** — body vacío `{}` |
| `GET` | `/conversations` | Lista de conversaciones del usuario |
| `GET` | `/conversations/:id` | Abrir conversación |
| `PATCH` | `/conversations/:id` | Reservado (sin campos editables) |
| `DELETE` | `/conversations/:id` | Eliminar conversación |

**Response:** `id`, `created_at`

---

### 👥 Conversation Participants — `/conversation-participants`

Usuarios dentro de una conversación.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/conversation-participants` | Agregar participante al chat |
| `GET` | `/conversation-participants` | Ver quién está en cada chat |
| `GET` | `/conversation-participants/:conversation_id/:user_id` | Ver participante |
| `PATCH` | `.../:conversation_id/:user_id` | Actualizar (raro) |
| `DELETE` | `.../:conversation_id/:user_id` | Sacar participante / salir del chat |

**POST body:** `conversation_id`, `user_id` (req)

**Clave compuesta** — sin `id` UUID.

---

### ✉️ Messages — `/messages`

Mensajes dentro de conversaciones.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/messages` | **Enviar mensaje** — texto, imagen o archivo |
| `GET` | `/messages` | **Historial del chat** (filtrar por `conversation_id`) |
| `GET` | `/messages/:id` | Mensaje individual |
| `PATCH` | `/messages/:id` | Marcar como leído (`is_read: true`) |
| `DELETE` | `/messages/:id` | Eliminar mensaje |

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `conversation_id` | UUID | ✅ | Chat destino |
| `sender_id` | UUID | ✅ | Remitente |
| `type` | string | | `texto` (default), `imagen`, `archivo` |
| `content` | string | | Texto del mensaje |
| `file_url` | string | | URL si es imagen/archivo |
| `is_read` | boolean | | Default `false` |

---

### 💰 Transactions — `/transactions`

Registro de pagos (pedidos o servicios).

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/transactions` | **Procesar pago** tras checkout |
| `GET` | `/transactions` | Historial de pagos |
| `GET` | `/transactions/:id` | Detalle transacción |
| `PATCH` | `/transactions/:id` | Actualizar estado (`completado`, `fallido`) |
| `DELETE` | `/transactions/:id` | Eliminar registro |

**POST body:** `user_id` (req), `order_id`, `service_assignment_id`, `amount` (req), `status`, `gateway`

> Vincular a pedido **o** servicio (uno u otro según contexto de pago).

---

### 🚗 Vehicles — `/vehicles`

Vehículos de repartidores/conductores.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/vehicles` | Registrar vehículo del conductor |
| `GET` | `/vehicles` | Flota del repartidor |
| `GET` | `/vehicles/:id` | Detalle vehículo |
| `PATCH` | `/vehicles/:id` | Actualizar datos o desactivar |
| `DELETE` | `/vehicles/:id` | Eliminar vehículo |

**POST body:** `driver_id`, `plate` (req, único), `brand`, `model`, `type`, `capacity_kg`, `is_active`

---

### 🚚 Deliveries — `/deliveries`

Entregas de pedidos con tracking.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/deliveries` | **Crear entrega** al confirmar pedido |
| `GET` | `/deliveries` | Panel repartidor / cliente siguiendo envío |
| `GET` | `/deliveries/:id` | **Pantalla tracking** — mapa, direcciones, estado |
| `PATCH` | `/deliveries/:id` | Actualizar estado, tiempos, polyline del mapa |
| `DELETE` | `/deliveries/:id` | Cancelar entrega |

**POST body:**

| Campo | Tipo | Req | Descripción UI |
|-------|------|-----|----------------|
| `order_id` | UUID | ✅ | Pedido a entregar |
| `driver_id` | UUID | ✅ | Repartidor asignado |
| `vehicle_id` | UUID | | Vehículo usado |
| `status` | string | | Default `pendiente` |
| `pickup_address` | string | ✅ | Origen (tienda) |
| `pickup_lat`, `pickup_lng` | number | | Pin mapa origen |
| `delivery_address` | string | ✅ | Destino (cliente) |
| `delivery_lat`, `delivery_lng` | number | | Pin mapa destino |
| `distance_meters` | int | | Distancia calculada |
| `duration_seconds` | int | | ETA en segundos |
| `polyline_encoded` | string | | Ruta codificada para Google/Mapbox |
| `started_at`, `completed_at` | ISO date | | Timestamps del viaje |

**Response incluye:** `created_at`, `updated_at`

---

### 📍 Route Waypoints — `/route-waypoints`

Paradas intermedias en una ruta de entrega.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/route-waypoints` | Agregar parada a la ruta |
| `GET` | `/route-waypoints` | Lista ordenada de paradas (filtrar por `delivery_id`) |
| `GET` | `/route-waypoints/:id` | Detalle parada |
| `PATCH` | `/route-waypoints/:id` | Marcar llegada/salida (`arrived_at`, `left_at`) |
| `DELETE` | `/route-waypoints/:id` | Eliminar parada |

**POST body:** `delivery_id`, `stop_order`, `address` (req), `lat`, `lng`, `is_pickup`, `arrived_at`, `left_at`

---

### 📡 Delivery Tracking — `/delivery-tracking`

Pings GPS en tiempo real durante entrega.

| Método | Ruta | Para qué sirve en el frontend |
|--------|------|-------------------------------|
| `POST` | `/delivery-tracking` | **App repartidor:** enviar ubicación cada N segundos |
| `GET` | `/delivery-tracking` | **Mapa cliente:** trazar recorrido (filtrar por `delivery_id`) |
| `GET` | `/delivery-tracking/:id` | Punto GPS individual |
| `PATCH` | `/delivery-tracking/:id` | Corregir registro |
| `DELETE` | `/delivery-tracking/:id` | Eliminar punto |

**POST body:** `delivery_id`, `lat`, `lng` (req), `recorded_at`

**ID:** bigint (string en JSON)

---

## Mapa de relaciones (para diseño de navegación)

```
User (1) ──→ (0..1) Client | Professional | Company | Admin
Client (1) ──→ (*) Order ──→ (*) OrderItem ──→ Product ──→ Company
Client (1) ──→ (*) ServiceRequest ──→ (*) ServiceOffer ──→ Professional
ServiceRequest + ServiceOffer ──→ ServiceAssignment ──→ Review
Order ──→ Delivery ──→ RouteWaypoint
Delivery ──→ DeliveryTracking (GPS)
User ──→ Transaction (pago de Order o ServiceAssignment)
User ──→ CommunityPost ──→ PostComment
Conversation ──→ ConversationParticipant ──→ User
Conversation ──→ Message
User ──→ UserMembership ──→ Membership
Professional ──→ ProfessionalSpecialty ──→ Specialty
User (driver) ──→ Vehicle
```

---

## Resumen de endpoints (133 total)

| Módulo | Endpoints |
|--------|-----------|
| users | 5 |
| clients | 5 |
| professionals | 5 |
| companies | 5 |
| admins | 5 |
| specialties | 5 |
| professional-specialties | 5 |
| products | 8 |
| orders | 5 |
| order-items | 5 |
| service-requests | 5 |
| service-offers | 5 |
| service-assignments | 5 |
| reviews | 5 |
| memberships | 5 |
| user-memberships | 5 |
| community-posts | 5 |
| post-comments | 5 |
| conversations | 5 |
| conversation-participants | 5 |
| messages | 5 |
| transactions | 5 |
| vehicles | 5 |
| deliveries | 5 |
| route-waypoints | 5 |
| delivery-tracking | 5 |

---

## Notas para la IA de diseño UI

1. **Paginación unificada** — todos los `GET` listados aceptan `offset` y `limit` (máx. 100) y responden `{ data, total, limit, offset }`. La lógica vive en los services (QueryBuilder), no en controllers.
2. **No hay filtros extra en backend** — salvo búsqueda `q` en productos (`name`, `description`, `company.commercial_name`); el resto filtra en frontend o pide endpoints custom.
3. **No hay auth/JWT** — diseñar login UI pero conectar IDs manualmente hasta implementar auth.
4. **Decimales como string** — formatear precios con `parseFloat()` + `Intl.NumberFormat`.
5. **Roles determinan layout** — usar `users.role` para mostrar nav distinto (cliente vs profesional vs empresa vs admin).
6. **Flujos con mapa** — `deliveries`, `route-waypoints`, `delivery-tracking` y geolocalización en `users`/`service-requests` requieren componente mapa.
7. **Estados visuales** — usar tablas de status de este doc para badges, steppers y empty states.
8. **Chat** — flujo de 3 pasos: crear conversación → agregar participantes → enviar mensajes.
