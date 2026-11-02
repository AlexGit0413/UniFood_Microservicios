
# UniFood

Sistema web de reserva anticipada de menús universitarios desarrollado como proyecto académico del curso de Cloud Computing de la Universidad Continental.

## 1. Descripción del proyecto

UniFood es una propuesta de aplicación web dirigida a estudiantes universitarios de la ciudad de Cusco.

El sistema permitirá consultar los menús disponibles en restaurantes cercanos a las universidades y reservar un almuerzo con anticipación.

También contará con una validación universitaria para que el restaurante pueda comprobar el carné del estudiante antes de permitirle realizar una reserva.

## 2. Problemática

En pequeños restaurantes cercanos a universidades, los pedidos se suelen organizar de manera presencial o mediante mensajes.

Esto puede generar confusiones con las reservas, falta de control de los platos disponibles y tiempos de espera para los estudiantes.

UniFood busca facilitar este proceso mediante una plataforma web sencilla que permita organizar los pedidos anticipadamente.

## 3. Objetivo del proyecto

Desarrollar un sistema web basado en una arquitectura de microservicios que permita gestionar estudiantes, validaciones universitarias, menús y reservas de almuerzos.

## 4. Microservicios

El proyecto estará compuesto por cuatro microservicios independientes.

### Microservicio de estudiantes
- Registrar estudiantes.
- Consultar información de estudiantes.
- Actualizar datos básicos.

### Microservicio de validación universitaria
- Registrar los datos del carné universitario.
- Consultar el estado de validación.
- Aprobar o rechazar solicitudes.

La validación será manual y no representa una verificación oficial de SUNEDU.

### Microservicio de menús
- Registrar menús del día.
- Consultar platos y precios.
- Controlar la cantidad disponible.

### Microservicio de pedidos
- Registrar reservas de almuerzos.
- Consultar pedidos.
- Actualizar el estado de las reservas.
- Verificar la validación del estudiante antes de aceptar un pedido.

## 5. Tecnologías previstas

- Node.js
- Express.js
- SQLite
- API REST
- Docker
- Docker Compose
- GitHub
- GitHub Actions

## 6. Integrantes y responsabilidades

| Integrante | Responsabilidad |
|---|---|
| Angelo Ccama Condori | Líder del proyecto, administración del repositorio e integración |
| Jose Leonardo Cruz Gonzales | Microservicio de estudiantes |
| Nahun Jose Saldivar Zamora | Microservicio de validación universitaria |
| Axel Rolando Nunez Enriquez | Microservicio de menús |
| Alexander Villa Andia | Microservicio de pedidos |

## 7. Organización del trabajo

El equipo utilizará GitHub para administrar el código del proyecto.

Cada integrante trabajará desde su propio fork del repositorio central y desarrollará sus funcionalidades en ramas independientes.

Los cambios se enviarán mediante Pull Requests para su revisión antes de incorporarse a la rama principal.

El líder del proyecto será responsable de organizar el repositorio y revisar las contribuciones de sus compañeros.

Cada integrante deberá realizar como mínimo tres commits durante el desarrollo.

## 8. Estructura del repositorio

La estructura propuesta es la siguiente:

```text
UniFood/
├── services/
│   ├── estudiantes/
│   ├── validacion-universitaria/
│   ├── menus/
│   └── pedidos/
├── docs/
├── .github/
├── .gitignore
├── CONTRIBUTING.md
└── README.md
```

