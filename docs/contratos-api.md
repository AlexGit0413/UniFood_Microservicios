# Contratos acordados para UniFood

## Acuerdos generales

- APIs HTTP, JSON, host `0.0.0.0`, un puerto por servicio.
- Todos exponen `GET /health` con `200 {"status":"ok"}`.
- Errores: `{"error":"CODIGO","message":"Mensaje"}`.
- Códigos habituales: 400 datos inválidos, 403 estudiante no aprobado, 404 no encontrado, 409 conflicto, 503 dependencia caída.
- Cada microservicio administra su propia SQLite; sin acceso directo a otras bases.

## Estudiantes — 3001 (Jose)

- `POST /estudiantes`: recibe `nombres`, `apellidos`, `universidad`, `codigoUniversitario`; devuelve `201` con `id`.
- `GET /estudiantes/:id`: devuelve `200` con estudiante o `404`.

## Validación universitaria — 3002 (Nahun)

- `POST /validaciones`: recibe `estudianteId`, `numeroCarne`, `fechaVencimiento`, revisa existencia del estudiante y crea estado `PENDIENTE`.
- `GET /validaciones/estudiantes/:estudianteId`: devuelve la validación reciente y su `estado`.
- `PATCH /validaciones/:id`: recibe `{"estado":"APROBADO"}` o `{"estado":"RECHAZADO"}`.
- Validación manual; no hay conexión con SUNEDU ni almacenamiento de imágenes del carné.

## Menús — 3003 (Axel)

- `POST /menus`: recibe `nombre`, `descripcion`, `precio`, `cupos`, `fecha`; devuelve `201`.
- `GET /menus?fecha=AAAA-MM-DD`: devuelve lista para esa fecha.
- `GET /menus/:id`: devuelve el menú o `404`.
- `POST /menus/:id/reservar-cupo`: descuenta **un cupo de forma atómica** o `409` si se agota.
- `POST /menus/:id/devolver-cupo`: compensa un descuento cuando falle el guardado del pedido.

## Pedidos — 3004 (Alexander)

- `POST /pedidos`: recibe `estudianteId`, `menuId`; consulta estudiante y validación aprobada, reserva cupo y guarda pedido con estado `PENDIENTE`.
- `GET /pedidos/:id`: devuelve pedido o `404`.
- `PATCH /pedidos/:id`: permite `PENDIENTE` -> `LISTO` -> `ENTREGADO`.
- Respuestas de rechazo: `403` sin aprobación, `404` si falta estudiante/menú, `409` sin cupo, `503` si una dependencia falla.

**Nota:** Este archivo fija contratos para el equipo. Las rutas de negocio descritas aquí todavía NO están implementadas en el esqueleto inicial.
