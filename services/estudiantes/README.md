# Microservicio de Estudiantes - UniFood

Responsable: **Jose Leonardo Cruz Gonzales**  
Puerto por defecto: `3001`  
Runtime: Node.js 24 (`node:24-alpine`)  
Persistencia: SQLite (`node:sqlite` nativo)  

---

## 1. Descripción

Este microservicio se encarga del registro y consulta de los datos de estudiantes universitarios para el sistema **UniFood**. Es consumido posteriormente por los microservicios de **Validación Universitaria** (puerto 3002) y **Pedidos** (puerto 3004).

---

## 2. Variables de entorno

| Variable | Descripción | Valor por defecto |
|---|---|---|
| `PORT` | Puerto HTTP donde escucha el servicio | `3001` |
| `DB_PATH` | Ruta absoluta o relativa del archivo SQLite | `/app/data/estudiantes.sqlite` (Docker) o `data/estudiantes.sqlite` (local) |

---

## 3. Endpoints y Contratos API

### 3.1 Verificación de Salud
* **Ruta:** `GET /health`
* **Código de respuesta:** `200 OK`
* **Respuesta:**
  ```json
  {
    "status": "ok"
  }
  ```

### 3.2 Registro de Estudiante
* **Ruta:** `POST /estudiantes`
* **Cabecera:** `Content-Type: application/json`
* **Cuerpo de solicitud (JSON):**
  ```json
  {
    "nombres": "Jose Leonardo",
    "apellidos": "Cruz Gonzales",
    "universidad": "Universidad Continental",
    "codigoUniversitario": "U20261001"
  }
  ```
* **Códigos de respuesta:**
  * `201 Created`: Estudiante registrado satisfactoriamente.
    ```json
    {
      "id": 1,
      "nombres": "Jose Leonardo",
      "apellidos": "Cruz Gonzales",
      "universidad": "Universidad Continental",
      "codigoUniversitario": "U20261001"
    }
    ```
  * `400 Bad Request`: Campos obligatorios vacíos o faltantes.
    ```json
    {
      "error": "CAMPOS_INVALIDOS",
      "message": "Los campos nombres, apellidos, universidad y codigoUniversitario son obligatorios."
    }
    ```
  * `409 Conflict`: Código universitario duplicado.
    ```json
    {
      "error": "CODIGO_DUPLICADO",
      "message": "El código universitario ya se encuentra registrado."
    }
    ```

### 3.3 Consulta de Estudiante por ID
* **Ruta:** `GET /estudiantes/:id`
* **Códigos de respuesta:**
  * `200 OK`: Estudiante encontrado.
    ```json
    {
      "id": 1,
      "nombres": "Jose Leonardo",
      "apellidos": "Cruz Gonzales",
      "universidad": "Universidad Continental",
      "codigoUniversitario": "U20261001"
    }
    ```
  * `404 Not Found`: Estudiante no existe o ID inválido.
    ```json
    {
      "error": "ESTUDIANTE_NO_ENCONTRADO",
      "message": "Estudiante no encontrado."
    }
    ```

---

## 4. Ejemplos de uso con `curl`

### Registrar estudiante:
```bash
curl -X POST http://localhost:3001/estudiantes \
  -H "Content-Type: application/json" \
  -d '{"nombres":"Jose Leonardo","apellidos":"Cruz Gonzales","universidad":"Universidad Continental","codigoUniversitario":"U20261001"}'
```

### Consultar estudiante por ID:
```bash
curl -X GET http://localhost:3001/estudiantes/1
```

### Verificar salud del servicio:
```bash
curl -X GET http://localhost:3001/health
```

---

## 5. Pruebas automatizadas

El servicio incluye pruebas unitarias y de integración utilizando el ejecutor nativo de Node.js (`node:test`) con base de datos en memoria para aislamiento completo:

```bash
npm test
```
