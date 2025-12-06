# Filtrado por Base de Datos - Envío Masivo de Emails

## 📋 Descripción

Nueva funcionalidad que permite enviar emails masivos solo a los usuarios de Keycloak que existen en tu base de datos, usando el campo `sub` de la tabla `user` como criterio de filtrado.

## ✨ Ventajas

✅ **Eficiente**: Solo consulta los usuarios que necesitas de Keycloak
✅ **Preciso**: Envía solo a usuarios registrados en tu sistema
✅ **Escalable**: No trae usuarios innecesarios de otros clientes
✅ **Automático**: No necesitas especificar roles ni listas manualmente

## 🔧 Cómo Funciona

```
┌─────────────────────────────────────────────────────────┐
│                    FLUJO DEL PROCESO                     │
└─────────────────────────────────────────────────────────┘

1. 📊 Consultar Base de Datos
   └─ SELECT sub FROM user

2. 🔍 Obtener Usuarios de Keycloak
   └─ Para cada 'sub', GET /users/{sub}

3. 📧 Enviar Emails
   └─ Solo a usuarios encontrados en ambos sistemas

4. ✅ Completar Proceso
   └─ Retornar estadísticas de envío
```

## 🚀 Uso

### Opción 1: Desde la API

```bash
curl -X POST http://localhost:3001/api/bulkEmail/send-from-database \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "subject": "Políticas de admisión 2026 - Colegio Albert Einstein",
    "htmlFilePath": "C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html"
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Proceso de envío masivo iniciado en segundo plano (filtrado por BD)",
  "processId": "1709123456789_abc123",
  "status": "running",
  "totalEmails": 45,
  "estimatedDuration": "2 minutos aprox."
}
```

### Opción 2: Desde JavaScript

```javascript
import { sendBulkEmailsFromDatabase } from './helpers/sendBulkEmailsSES.js';

const result = await sendBulkEmailsFromDatabase(
  'C:/path/to/template.html',
  'Asunto del email'
);

console.log('Proceso iniciado:', result.processId);
```

### Opción 3: Usar la función principal con opciones

```javascript
import { sendBulkEmails } from './helpers/sendBulkEmailsSES.js';

await sendBulkEmails({
  filterByDatabase: true,
  htmlTemplatePath: '/path/to/template.html',
  subject: 'Asunto del email',
  batchSize: 5,
  batchDelay: 2000,
  pauseAfterBatch: 1000,
  onProgress: (sent, total) => {
    console.log(`Enviados ${sent}/${total}`);
  },
  onComplete: (results) => {
    console.log('Completado!', results);
  }
});
```

## 🧪 Prueba

```bash
# Ejecutar script de prueba
node examples/testBulkEmailDatabase.js
```

## 📊 Ejemplo de Salida

```
╔═══════════════════════════════════════════════════╗
║   TEST DE ENVÍO DESDE BASE DE DATOS              ║
╚═══════════════════════════════════════════════════╝

📄 Template: C:/Users/.../politicas-admision-2026.html
🔍 Filtro: Usuarios con 'sub' en la base de datos

⏳ Iniciando envío...

Obteniendo usuarios de la base de datos...
Total de usuarios en BD: 45
Obteniendo información de 45 usuarios desde Keycloak...
Obteniendo 45 usuarios de Keycloak...
✓ Usuarios encontrados: 42
⚠️  Usuarios no encontrados en Keycloak: 3
Usuarios de Keycloak obtenidos: 42
Total de usuarios a enviar: 42
Usuarios con email válido: 42

Procesando lote 1/9 (5 emails)...
✓ Email enviado a: padre1@example.com (Juan Pérez)
✓ Email enviado a: padre2@example.com (María García)
...
```

## 🔍 Consultar Progreso

```bash
# Obtener estado del proceso
curl http://localhost:3001/api/bulkEmail/status/1709123456789_abc123
```

**Response:**
```json
{
  "success": true,
  "process": {
    "processId": "1709123456789_abc123",
    "status": "running",
    "totalEmails": 42,
    "sentEmails": 30,
    "failedEmails": 0,
    "progress": 71,
    "startTime": "2025-02-28T10:00:00.000Z",
    "duration": 45000
  }
}
```

## 📋 Parámetros

### API Endpoint: `POST /api/bulkEmail/send-from-database`

| Parámetro | Tipo | Requerido | Default | Descripción |
|-----------|------|-----------|---------|-------------|
| `htmlFilePath` | string | ✅ | - | Ruta al archivo HTML del template |
| `subject` | string | ❌ | "Información Importante..." | Asunto del email |
| `batchSize` | number | ❌ | 5 | Emails por lote |
| `batchDelay` | number | ❌ | 2000 | Delay entre lotes (ms) |
| `pauseAfterBatch` | number | ❌ | 1000 | Pausa después de lote (ms) |

## 🗄️ Base de Datos

La función consulta la tabla `user` de tu base de datos:

```sql
SELECT
  sub,
  person.name,
  person.lastname,
  person.mLastname,
  person.email
FROM user
INNER JOIN person ON user.person_id = person.id
```

### Esquema de la tabla `user`

```prisma
model user {
  id                Int      @id @default(autoincrement())
  sub               String   @unique  // ID de Keycloak
  person_id         Int
  person            person   @relation(...)
  // ... otros campos
}
```

## 🔄 Proceso Detallado

### 1. Consulta a Base de Datos
```javascript
const dbUsers = await prisma.user.findMany({
  select: {
    sub: true,
    person: {
      select: {
        name: true,
        lastname: true,
        mLastname: true,
        email: true,
      },
    },
  },
});
```

### 2. Extracción de IDs de Keycloak
```javascript
const keycloakIds = dbUsers.map((u) => u.sub);
// Resultado: ['uuid-1', 'uuid-2', 'uuid-3', ...]
```

### 3. Consulta a Keycloak
```javascript
// Para cada ID, hace:
GET https://login.colegioae.edu.pe/admin/realms/{realm}/users/{userId}

// Procesado en lotes de 10 para no sobrecargar la API
```

### 4. Mapeo de Usuarios
```javascript
users = keycloakUsers.map((kUser) => ({
  id: kUser.id,
  email: kUser.email,
  firstName: kUser.firstName,
  lastName: kUser.lastName,
  username: kUser.username,
}));
```

### 5. Envío de Emails
```javascript
// Envío en lotes configurables
// Con control de velocidad (rate limiting)
```

## ⚠️ Consideraciones

### Usuarios No Encontrados
- Si un `sub` de la BD no existe en Keycloak, se registra como "no encontrado"
- El proceso continúa con los demás usuarios
- Se reporta en los logs cuántos no fueron encontrados

### Performance
- **Base de datos**: 1 consulta para todos los `sub`
- **Keycloak**: Procesado en lotes de 10 usuarios
- **Rate limiting**: 5 emails cada 3 segundos (configurable)

### Tiempo Estimado
Para 100 usuarios:
- Consulta BD: ~100ms
- Consulta Keycloak: ~10 segundos (10 lotes × 1s)
- Envío emails: ~60 segundos (20 lotes × 3s)
- **Total**: ~70 segundos

## 🆚 Comparación con Otras Opciones

| Método | Ventaja | Desventaja |
|--------|---------|------------|
| **Por Base de Datos** | Solo usuarios del sistema | Requiere BD actualizada |
| Por Rol | Simple y directo | Puede incluir usuarios no registrados |
| Lista Personalizada | Control total | Requiere preparar lista manualmente |

## 🔐 Seguridad

- ✅ Requiere autenticación en la API
- ✅ Solo accede a datos de tu base de datos
- ✅ Usa token de Keycloak con permisos admin
- ✅ No expone datos de usuarios en respuestas

## 📝 Logs

Los logs incluyen información detallada del proceso:

```
[2025-02-28T10:00:00.000Z] Obteniendo usuarios de la base de datos...
[2025-02-28T10:00:01.000Z] Total de usuarios en BD: 45
[2025-02-28T10:00:02.000Z] Obteniendo información de 45 usuarios desde Keycloak...
[2025-02-28T10:00:12.000Z] ✓ Usuarios encontrados: 42
[2025-02-28T10:00:12.000Z] ⚠️ Usuarios no encontrados en Keycloak: 3
[2025-02-28T10:00:12.000Z] SUCCESS: Email enviado a padre1@example.com (Juan Pérez)
...
```

## 🐛 Troubleshooting

### Error: "No se encontraron usuarios en la base de datos"
- Verifica que la tabla `user` tenga registros
- Verifica la conexión a la base de datos

### Error: "No se pudo obtener el token de Keycloak"
- Verifica las credenciales de Keycloak en `.env`
- Verifica que el usuario tenga permisos de admin

### Usuarios no reciben emails
- Verifica que los `sub` en la BD coincidan con IDs de Keycloak
- Verifica que los usuarios tengan email en Keycloak
- Revisa los logs para ver si hay usuarios no encontrados

## 📚 Archivos Relacionados

- `helpers/sendBulkEmailsSES.js` - Función principal
- `helpers/getKeycloakUserById.js` - Consulta de usuarios de Keycloak
- `controllers/BulkEmailController.js` - Endpoint de la API
- `routes/bulkEmail.js` - Rutas
- `examples/testBulkEmailDatabase.js` - Script de prueba

---

**Creado:** 2025-12-05
**Versión:** 1.0.0
