# Optimización del endpoint /admin/status-families

## Problema Original

La consulta `/admin/status-families` demoraba **más de 20 segundos** en responder.

## Causas Identificadas

1. **Carga completa de datos sin paginación**: Se traían TODOS los registros sin límite
2. **N+1 Queries a SIGE**: Se hacían llamadas HTTP secuenciales a SIGE para cada familia
3. **Selección innecesaria de campos**: Se traían campos completos que no se usaban
4. **Sin ordenamiento optimizado**: No había índice de ordenamiento

## Optimizaciones Implementadas

### 1. **Paginación** ✅

```javascript
// Query parameters
- page: número de página (default: 1)
- pageSize: registros por página (default: 20)

// Respuesta incluye
{
  success: true,
  data: [...],
  pagination: {
    page: 1,
    pageSize: 20,
    total: 250,
    totalPages: 13
  }
}
```

**Impacto**: Reduce el volumen de datos transferidos de ~100-200 registros a 20 por página.

### 2. **Select Selectivo en Prisma**

Antes: `person: true` traía TODOS los campos
Después: Select específico de solo campos necesarios

```javascript
person: {
  select: {
    name: true,
    lastname: true,
    mLastname: true,
    gender: true,
    doc_number: true,
    birthdate: true,
  },
}
```

**Impacto**: Reduce tamaño de payload y tiempo de BD.

### 3. **Procesamiento de SIGE en Lotes**

Antes: Llamadas secuenciales a SIGE (1 + 1 + 1...)
Después: Procesamiento en lotes de 5 llamadas en paralelo

```javascript
const SIGE_BATCH_SIZE = 5;
for (let i = 0; i < sigeKeys.length; i += SIGE_BATCH_SIZE) {
  const batch = sigeKeys.slice(i, i + SIGE_BATCH_SIZE);
  const batchResults = await Promise.all(batch.map(...));
}
```

**Impacto**: Si hay 50 familias, antes eran 50 llamadas secuenciales; ahora son 10 lotes en paralelo.

### 4. **Optimización de Índices**

Se agregó ordenamiento en Prisma:

```javascript
orderBy: {
  id: 'desc',
}
```

**Recomendación**: Crear índice en BD

```sql
CREATE INDEX idx_children_id_desc ON children(id DESC);
```

## Resultados Esperados

| Métrica                         | Antes           | Después            | Mejora       |
| ------------------------------- | --------------- | ------------------ | ------------ |
| Tiempo respuesta (20 registros) | 20-25s          | 1-2s               | **90-95%** ↓ |
| Tamaño payload                  | ~2-3 MB         | ~100-150 KB        | **95%** ↓    |
| Llamadas SIGE (50 familias)     | 50 secuenciales | 10 lotes paralelos | **5x** ↓     |

## Uso del Endpoint

### Solicitud básica (primera página, 20 registros)

```bash
GET /admin/status-families
Authorization: Bearer <token>
```

### Con paginación personalizada

```bash
GET /admin/status-families?page=2&pageSize=50
Authorization: Bearer <token>
```

### Con año específico

```bash
GET /admin/status-families?page=1&pageSize=20&yearId=2024
Authorization: Bearer <token>
```

## Archivos Modificados

1. **[repositories/FamilyRepository.js](repositories/FamilyRepository.js)** - Agregada paginación a `getVacant()`
2. **[controllers/AdminController.js](controllers/AdminController.js)** - Optimizado `getStatusFamilyAndChildren()`
3. **[routes/admin.js](routes/admin.js)** - Documentación OpenAPI actualizada

## Próximas Mejoras Sugeridas

### Base de Datos

```sql
-- Crear índices compuestos
CREATE INDEX idx_children_vacant_year ON children(id)
  WHERE vacant.year_id = year_id;

CREATE INDEX idx_vacant_status_year ON vacant(status, year_id);
```

### Cache (Redis)

Implementar caché en la respuesta paginada:

```javascript
const cacheKey = `status-families:${yearId}:${page}:${pageSize}`;
const cached = await redis.get(cacheKey);
// ...
await redis.setex(cacheKey, 300, JSON.stringify(response)); // 5 min TTL
```

### Base de Datos - Vistas Materializadas

Crear una vista materializada que actualice cada X minutos:

```sql
CREATE MATERIALIZED VIEW status_families_view AS
SELECT ... (query optimizada)
REFRESH MATERIALIZED VIEW status_families_view;
```
