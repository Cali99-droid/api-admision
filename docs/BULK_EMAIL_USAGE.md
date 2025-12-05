# Guía de Uso - Envío Masivo de Emails

## Descripción

Este módulo permite enviar emails masivos a usuarios de Keycloak de forma controlada y en segundo plano, con las siguientes características:

- ✅ Envío en segundo plano (no bloquea la API)
- ✅ Control de velocidad (rate limiting)
- ✅ Envío por lotes configurables
- ✅ Pausas personalizables entre lotes
- ✅ Seguimiento de progreso en tiempo real
- ✅ Logs detallados de cada envío
- ✅ Manejo robusto de errores

## Características Técnicas

### Rate Limiting
- **Lotes**: 5 emails por lote (configurable)
- **Delay entre lotes**: 2 segundos (configurable)
- **Pausa después de cada lote**: 1 segundo (configurable)

Ejemplo: Para 100 usuarios con configuración por defecto:
- 20 lotes de 5 emails
- Tiempo estimado: ~60 segundos

## Endpoints Disponibles

### 1. Enviar por Rol de Keycloak

**POST** `/api/bulkEmail/send-by-role`

Envía emails a todos los usuarios que tengan un rol específico en Keycloak.

**Request Body:**
```json
{
  "roleName": "student",
  "subject": "Políticas de admisión 2026 - Colegio Albert Einstein",
  "htmlFilePath": "C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html",
  "isClientRole": false,
  "batchSize": 5,
  "batchDelay": 2000,
  "pauseAfterBatch": 1000
}
```

**Parámetros:**
- `roleName` (requerido): Nombre del rol en Keycloak
- `subject` (opcional): Asunto del email (default: "Información Importante - Colegio Albert Einstein")
- `htmlFilePath` (requerido): Ruta absoluta al archivo HTML del template
- `isClientRole` (opcional): Si es un rol de cliente (default: false)
- `batchSize` (opcional): Emails por lote (default: 5)
- `batchDelay` (opcional): Milisegundos entre lotes (default: 2000)
- `pauseAfterBatch` (opcional): Milisegundos de pausa después de cada lote (default: 1000)

**Response:**
```json
{
  "success": true,
  "message": "Proceso de envío masivo iniciado en segundo plano",
  "processId": "1709123456789_abc123",
  "status": "running",
  "totalEmails": 150,
  "estimatedDuration": "5 minutos aprox."
}
```

### 2. Enviar a Lista Personalizada

**POST** `/api/bulkEmail/send-custom`

Envía emails a una lista personalizada de usuarios.

**Request Body:**
```json
{
  "users": [
    {
      "email": "padre1@example.com",
      "firstName": "Juan",
      "lastName": "Pérez"
    },
    {
      "email": "padre2@example.com",
      "firstName": "María",
      "lastName": "García"
    }
  ],
  "subject": "Políticas de admisión 2026",
  "htmlFilePath": "C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html",
  "batchSize": 5,
  "batchDelay": 2000,
  "pauseAfterBatch": 1000
}
```

**Response:**
```json
{
  "success": true,
  "message": "Proceso de envío masivo iniciado en segundo plano",
  "processId": "1709123456789_xyz456",
  "status": "running",
  "totalEmails": 2
}
```

### 3. Consultar Estado del Proceso

**GET** `/api/bulkEmail/status/:processId`

Consulta el estado actual de un proceso de envío.

**Response:**
```json
{
  "success": true,
  "process": {
    "processId": "1709123456789_abc123",
    "status": "running",
    "totalEmails": 150,
    "sentEmails": 75,
    "failedEmails": 2,
    "progress": 50,
    "startTime": "2025-02-28T10:00:00.000Z",
    "endTime": null,
    "duration": 60000,
    "error": null
  }
}
```

### 4. Listar Todos los Procesos

**GET** `/api/bulkEmail/processes`

Lista todos los procesos activos y recientes (últimas 1 hora).

**Response:**
```json
{
  "success": true,
  "total": 3,
  "processes": [
    {
      "processId": "1709123456789_abc123",
      "status": "completed",
      "roleName": "student",
      "totalEmails": 150,
      "sentEmails": 148,
      "failedEmails": 2,
      "progress": 100,
      "startTime": "2025-02-28T10:00:00.000Z",
      "endTime": "2025-02-28T10:05:00.000Z",
      "createdAt": "2025-02-28T10:00:00.000Z"
    }
  ]
}
```

### 5. Obtener Resultados Detallados

**GET** `/api/bulkEmail/results/:processId`

Obtiene los resultados detallados de cada email enviado.

**Response:**
```json
{
  "success": true,
  "process": {
    "processId": "1709123456789_abc123",
    "status": "completed",
    "totalEmails": 150,
    "sentEmails": 148,
    "failedEmails": 2,
    "startTime": "2025-02-28T10:00:00.000Z",
    "endTime": "2025-02-28T10:05:00.000Z",
    "results": [
      {
        "email": "padre1@example.com",
        "name": "Juan Pérez",
        "status": "success",
        "timestamp": "2025-02-28T10:00:05.000Z"
      },
      {
        "email": "padre2@example.com",
        "name": "María García",
        "status": "failed",
        "error": "Email address invalid",
        "timestamp": "2025-02-28T10:00:06.000Z"
      }
    ]
  }
}
```

## Ejemplos de Uso

### Ejemplo 1: Enviar a todos los estudiantes

```javascript
// Usando fetch
const response = await fetch('http://localhost:3001/api/bulkEmail/send-by-role', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    roleName: 'student',
    subject: 'Políticas de admisión 2026',
    htmlFilePath: 'C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html'
  })
});

const data = await response.json();
console.log('Proceso iniciado:', data.processId);

// Consultar estado
const statusResponse = await fetch(`http://localhost:3001/api/bulkEmail/status/${data.processId}`);
const status = await statusResponse.json();
console.log(`Progreso: ${status.process.progress}%`);
```

### Ejemplo 2: Enviar a lista personalizada

```javascript
const users = [
  { email: 'padre1@example.com', firstName: 'Juan', lastName: 'Pérez' },
  { email: 'padre2@example.com', firstName: 'María', lastName: 'García' }
];

const response = await fetch('http://localhost:3001/api/bulkEmail/send-custom', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YOUR_TOKEN'
  },
  body: JSON.stringify({
    users,
    subject: 'Bienvenidos al proceso de admisión',
    htmlFilePath: 'C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html'
  })
});

const data = await response.json();
console.log('Emails enviándose:', data.processId);
```

### Ejemplo 3: Monitorear progreso

```javascript
async function monitorearProceso(processId) {
  const interval = setInterval(async () => {
    const response = await fetch(`http://localhost:3001/api/bulkEmail/status/${processId}`);
    const data = await response.json();

    console.log(`Progreso: ${data.process.progress}%`);
    console.log(`Enviados: ${data.process.sentEmails}/${data.process.totalEmails}`);
    console.log(`Fallidos: ${data.process.failedEmails}`);

    if (data.process.status === 'completed' || data.process.status === 'error') {
      clearInterval(interval);
      console.log('Proceso finalizado');

      // Obtener resultados detallados
      const resultsResponse = await fetch(`http://localhost:3001/api/bulkEmail/results/${processId}`);
      const results = await resultsResponse.json();
      console.log('Resultados:', results.process.results);
    }
  }, 5000); // Consultar cada 5 segundos
}
```

### Ejemplo 4: Usando cURL

```bash
# Enviar por rol
curl -X POST http://localhost:3001/api/bulkEmail/send-by-role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "roleName": "student",
    "subject": "Políticas de admisión 2026",
    "htmlFilePath": "C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html"
  }'

# Consultar estado
curl http://localhost:3001/api/bulkEmail/status/1709123456789_abc123 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Configuración de Templates

Los templates HTML deben estar ubicados en el directorio `templates/emails/`:

```
api_admision/
├── templates/
│   └── emails/
│       ├── politicas-admision-2026.html
│       ├── bienvenida.html
│       └── recordatorio.html
```

### Crear un Nuevo Template

1. Crea un archivo HTML en `templates/emails/`
2. Usa el archivo `politicas-admision-2026.html` como referencia
3. Asegúrate de que el HTML sea responsive y compatible con clientes de email
4. Usa la ruta absoluta del archivo en el parámetro `htmlFilePath`

## Logs y Monitoreo

Todos los envíos se registran en:
- **Console**: Muestra progreso en tiempo real
- **Logger Stream**: Archivo de logs detallado (ver `utils/handleLogger.js`)

Formato de logs:
```
[2025-02-28T10:00:05.000Z] SUCCESS: Email enviado a padre1@example.com (Juan Pérez)
[2025-02-28T10:00:06.000Z] ERROR: Falló envío a invalid@email (Usuario Test) - Invalid email
```

## Mejores Prácticas

1. **Usar rutas absolutas**: Siempre proporciona rutas absolutas a los templates HTML
2. **Monitorear progreso**: Usa el endpoint de status para hacer seguimiento
3. **Revisar resultados**: Después de completar, revisa los emails fallidos
4. **Ajustar rate limiting**: Si AWS SES te da errores de throttling, reduce `batchSize` o aumenta `batchDelay`
5. **Templates responsive**: Asegúrate de que tus templates funcionen en mobile
6. **Validar emails**: La función filtra automáticamente emails inválidos

## Limitaciones de AWS SES

- Límite de envío: Depende de tu cuenta de AWS SES
- Rate por defecto: 1 mensaje/segundo (configurado en el transporter)
- Emails verificados: En modo sandbox, solo puedes enviar a emails verificados

## Solución de Problemas

### Error: "No se encontraron usuarios"
- Verifica que el nombre del rol sea correcto
- Verifica que el rol tenga usuarios asignados
- Verifica `isClientRole` si es un rol de cliente

### Error: "Cannot read file"
- Verifica que la ruta del HTML sea absoluta
- Verifica que el archivo exista
- Verifica permisos de lectura

### Emails no se envían
- Verifica configuración de AWS SES en `.env`
- Verifica que el email remitente esté verificado en AWS SES
- Revisa los logs para errores específicos

### Proceso muy lento
- Ajusta `batchSize` para enviar más emails por lote
- Reduce `batchDelay` y `pauseAfterBatch`
- Nota: No excedas el límite de AWS SES (generalmente 14 mensajes/segundo)

## Variables de Entorno Requeridas

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-west-2
AWS_SES_FROM=no-responder@admision.colegioae.com
KEYCLOAK_REALM=test-login
KEYCLOAK_AUTH_SERVER_URL=https://login.colegioae.edu.pe
```

## Seguridad

- Todos los endpoints requieren autenticación (excepto rutas abiertas)
- Los procesos se limpian automáticamente después de 1 hora
- Los datos de email no se almacenan en base de datos
- Los logs contienen información sensible, protégelos adecuadamente
