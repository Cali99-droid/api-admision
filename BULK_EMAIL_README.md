# Envío Masivo de Emails - Colegio Albert Einstein

## 📋 Descripción

Envío masivo de emails a usuarios de Keycloak, con control de velocidad, ejecución en segundo plano y seguimiento detallado del proceso.

## ✨ Características

- ✅ **Envío en segundo plano**: No bloquea la API
- ✅ **Control de velocidad**: Rate limiting configurable
- ✅ **Envío por lotes**: Procesamiento en grupos para evitar sobrecarga
- ✅ **Seguimiento en tiempo real**: Consulta el progreso del envío
- ✅ **Logs detallados**: Registro completo de cada email enviado
- ✅ **Manejo de errores**: Continúa enviando aunque algunos fallen
- ✅ **Múltiples fuentes**: Por rol de Keycloak o lista personalizada
- ✅ **Templates HTML**: Soporte completo para emails con diseño

## 🚀 Inicio Rápido

### 1. Instalación

Todas las dependencias ya están instaladas en el proyecto:

- `@aws-sdk/client-ses` - Cliente de AWS SES
- `nodemailer` - Gestor de emails

### 2. Configuración

Verifica que tu archivo `.env` tenga las siguientes variables:

```env
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=us-west-2
AWS_SES_FROM=no-responder@admision.colegioae.com

KEYCLOAK_REALM=test-login
KEYCLOAK_AUTH_SERVER_URL=https://login.colegioae.edu.pe
```

### 3. Ejecutar Prueba

```bash
# Edita el archivo examples/testBulkEmail.js y agrega tus emails de prueba
node examples/testBulkEmail.js
```

## 📁 Estructura de Archivos Creados

```
api_admision/
├── helpers/
│   └── sendBulkEmailsSES.js          # Lógica principal de envío masivo
├── controllers/
│   └── BulkEmailController.js        # Controlador REST API
├── routes/
│   └── bulkEmail.js                  # Rutas de la API
├── templates/
│   └── emails/
│       └── politicas-admision-2026.html  # Template de ejemplo
├── examples/
│   ├── sendBulkEmailExample.js       # 5 ejemplos de uso
│   └── testBulkEmail.js              # Script de prueba rápida
└── docs/
    └── BULK_EMAIL_USAGE.md           # Documentación completa
```

## 📡 API Endpoints

### 1. Enviar por Rol

```bash
POST /api/bulkEmail/send-by-role
```

### 2. Enviar Lista Personalizada

```bash
POST /api/bulkEmail/send-custom
```

### 3. Consultar Estado

```bash
GET /api/bulkEmail/status/:processId
```

### 4. Listar Procesos

```bash
GET /api/bulkEmail/processes
```

### 5. Ver Resultados

```bash
GET /api/bulkEmail/results/:processId
```

## 💡 Ejemplos de Uso

### Desde la API

```bash
curl -X POST http://localhost:3001/api/bulkEmail/send-by-role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "roleName": "student",
    "subject": "Políticas de admisión 2026",
    "htmlFilePath": "C:/Users/Sistemas/Desktop/api_admision/templates/emails/politicas-admision-2026.html"
  }'
```

### Desde JavaScript

```javascript
import { sendBulkEmailsByRole } from "./helpers/sendBulkEmailsSES.js";

await sendBulkEmailsByRole(
  "student",
  "/path/to/template.html",
  "Asunto del email"
);
```

### Ejemplo Completo

Ver [examples/sendBulkEmailExample.js](examples/sendBulkEmailExample.js) para 5 ejemplos completos de uso.

## ⚙️ Configuración Avanzada

### Control de Velocidad (Rate Limiting)

```javascript
await sendBulkEmails({
  roleName: "student",
  htmlTemplatePath: "/path/to/template.html",
  subject: "Asunto",
  batchSize: 5, // Emails por lote
  batchDelay: 2000, // Delay entre lotes (ms)
  pauseAfterBatch: 1000, // Pausa después de lote (ms)
});
```

**Cálculo de tiempo estimado:**

- Para 100 usuarios con configuración por defecto:
- 20 lotes × (2s delay + 1s pausa) = ~60 segundos

### Callbacks Personalizados

```javascript
await sendBulkEmails({
  // ... configuración
  onProgress: (sent, total, batch) => {
    console.log(`Enviados ${sent}/${total}`);
  },
  onComplete: (results) => {
    console.log("Completado!", results);
  },
  onError: (error) => {
    console.error("Error:", error);
  },
});
```

## 📊 Monitoreo y Logs

### Console Output

```
Procesando lote 1/20 (5 emails)...
✓ Email enviado a: padre1@example.com (Juan Pérez)
✓ Email enviado a: padre2@example.com (María García)
Pausando 1000ms antes del siguiente lote...
```

### Log File

Los logs se guardan automáticamente en el archivo configurado en `utils/handleLogger.js`:

```
[2025-02-28T10:00:05.000Z] SUCCESS: Email enviado a padre1@example.com (Juan Pérez)
[2025-02-28T10:00:06.000Z] ERROR: Falló envío a invalid@email - Invalid email
```

## 🔧 Solución de Problemas

### Error: "No se encontraron usuarios"

- Verifica el nombre del rol
- Verifica que `isClientRole` esté correcto
- Verifica que el rol tenga usuarios

### Error: "Cannot read file"

- Usa ruta absoluta al archivo HTML
- Verifica que el archivo exista
- Verifica permisos de lectura

### Emails no llegan

- Verifica configuración AWS SES en `.env`
- Verifica que el remitente esté verificado en AWS
- Revisa la carpeta de SPAM
- Consulta los logs para errores

### Proceso muy lento

- Aumenta `batchSize` (cuidado con límites de AWS)
- Reduce `batchDelay` y `pauseAfterBatch`
- Límite de AWS SES: generalmente 14 msg/segundo

## 📚 Documentación Completa

Ver [docs/BULK_EMAIL_USAGE.md](docs/BULK_EMAIL_USAGE.md) para documentación detallada de:

- Todos los endpoints de la API
- Parámetros y opciones
- Ejemplos de uso con fetch, curl, etc.
- Configuración de templates
- Mejores prácticas
- Limitaciones de AWS SES

## 🔐 Seguridad

- Todos los endpoints requieren autenticación
- Los procesos se limpian automáticamente después de 1 hora
- Los datos sensibles no se almacenan en base de datos
- Los logs contienen información sensible - protégelos

## 🎯 Casos de Uso

1. **Envío de políticas de admisión** a todos los postulantes
2. **Notificaciones masivas** a estudiantes activos
3. **Recordatorios** a grupos específicos
4. **Comunicados institucionales** a toda la comunidad
5. **Invitaciones** a eventos por rol

## 📝 Próximos Pasos

1. Ejecuta el test: `node examples/testBulkEmail.js`
2. Revisa los ejemplos: `examples/sendBulkEmailExample.js`
3. Lee la documentación completa: `docs/BULK_EMAIL_USAGE.md`
4. Crea tus propios templates en `templates/emails/`
5. Integra con tu aplicación usando la API o directamente el helper

## 🤝 Soporte

Para preguntas o problemas:

1. Revisa la documentación en `docs/BULK_EMAIL_USAGE.md`
2. Consulta los logs del sistema
3. Verifica la configuración de AWS SES

## 📄 Licencia

Este código es parte del sistema de admisión del Colegio Albert Einstein.

---

**Creado por:** Sistema de Admisión - Colegio Albert Einstein
**Fecha:** 2025
**Versión:** 1.0.0
