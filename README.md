
# UniFood

Sistema web de reserva anticipada de menús universitarios desarrollado como proyecto académico del curso de Cloud Computing de la Universidad Continental.

## 1. Integrantes y responsabilidades

| Integrante | Responsabilidad |
|---|---|
| Angelo Ccama Condori | Líder del proyecto, administración del repositorio e integración |
| Jose Leonardo Cruz Gonzales | Microservicio de estudiantes |
| Nahun Jose Saldivar Zamora | Microservicio de validación universitaria |
| Axel Rolando Nunez Enriquez | Microservicio de menús |
| Alexander Villa Andia | Microservicio de pedidos |


## 2. Descripción del proyecto

UniFood es una propuesta de aplicación web dirigida a estudiantes universitarios de la ciudad de Cusco.

El sistema permitirá consultar los menús disponibles en restaurantes cercanos a las universidades y reservar un almuerzo con anticipación.

También contará con una validación universitaria para que el restaurante pueda comprobar el carné del estudiante antes de permitirle realizar una reserva.

## 3. Microservicios

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



