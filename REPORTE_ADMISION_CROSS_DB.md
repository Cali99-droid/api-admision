# Reporte de Admisión — Consulta Cross-Database

## Contexto

Se necesitaba generar un reporte consolidado del proceso de admisión 2025 con el siguiente formato:

| nivel | registrados | atendidos secretaria | atendidos psicología | aptos | reservados | matriculados |
|---|---|---|---|---|---|---|
| inicial | ... | ... | ... | ... | ... | ... |
| primaria | ... | ... | ... | ... | ... | ... |
| secundaria | ... | ... | ... | ... | ... | ... |

El reporte cruza dos bases de datos MySQL en el **mismo servidor**:
- `bd_admision` — sistema de postulaciones (Prisma + Node.js)
- `db_colegioae` — sistema del colegio (matrícula y reservas)

---

## Modelo de datos relevante

### bd_admision

```
vacant (por hijo/año)
  ├── level: varchar  → 'inicial' | 'primaria' | 'secundaria'
  ├── status: enum    → 'on process' | 'accepted' | 'denied' | 'expired'
  └── year_id         → FK a tabla year

children
  ├── person_id       → FK a person (datos del niño)
  └── family_id       → FK a family

person
  └── doc_number: CHAR(9)   → DNI del niño

familiy_secretary (por familia/año)
  ├── status: 0 = no atendido, 1 = atendido
  └── year_id

psy_evaluation (por familia/año)
  ├── applied: 0 = no asignado, 1 = aplicado, 3 = no necesario
  └── year_id
```

### db_colegioae

```
person
  └── docNumber: VARCHAR     → DNI (llave de cruce entre BDs)

student (1:1 con person)
  └── personId               → FK a person

enrollment (muchos a student)
  ├── studentId              → FK a student
  ├── activityClassroomId    → FK a activityClassroom
  └── status: enum           → 'reserved' | 'registered' | 'pre-registered' | 'retired'

activityClassroom
  └── phaseId                → FK a phase

phase
  └── yearId                 → año lectivo en el colegio
```

---

## Columnas del reporte y su origen

| Columna | Tabla fuente | Criterio |
|---|---|---|
| `registrados` | `vacant` | `COUNT(DISTINCT children_id)` por `year_id` |
| `atendidos_secretaria` | `familiy_secretary` | familia con `status = 1` para el año |
| `atendidos_psicologia` | `psy_evaluation` | familia con `applied = 1` para el año |
| `aptos` | `vacant` | `status = 'accepted'` |
| `reservados` | `db_colegioae.enrollment` | cruce por DNI + `status = 'reserved'` + año |
| `matriculados` | `db_colegioae.enrollment` | cruce por DNI + `status = 'registered'` + año |

---

## Consulta SQL final

```sql
SELECT
  v.level,

  COUNT(DISTINCT v.children_id)                                          AS registrados,

  COUNT(DISTINCT CASE
    WHEN EXISTS(
      SELECT 1 FROM familiy_secretary fs
      WHERE fs.family_id = c.family_id
        AND fs.year_id   = {yearId}
        AND fs.status    = 1
    ) THEN v.children_id END)                                            AS atendidos_secretaria,

  COUNT(DISTINCT CASE
    WHEN EXISTS(
      SELECT 1 FROM psy_evaluation pe
      WHERE pe.family_id = c.family_id
        AND pe.year_id   = {yearId}
        AND pe.applied   = 1
    ) THEN v.children_id END)                                            AS atendidos_psicologia,

  COUNT(DISTINCT CASE
    WHEN v.status = 'accepted'
    THEN v.children_id END)                                              AS aptos,

  COUNT(DISTINCT CASE
    WHEN col.has_reserved = 1
    THEN v.children_id END)                                              AS reservados,

  COUNT(DISTINCT CASE
    WHEN col.has_registered = 1
    THEN v.children_id END)                                              AS matriculados

FROM   vacant    v
JOIN   children  c  ON v.children_id = c.id
JOIN   person    p  ON c.person_id   = p.id

-- Subquery que corre UNA SOLA VEZ: pre-agrega db_colegioae por DNI
LEFT JOIN (
  SELECT
    TRIM(cp.docNumber) COLLATE utf8mb4_0900_ai_ci  AS docNumber,
    MAX(e.status = 'reserved')                      AS has_reserved,
    MAX(e.status = 'registered')                    AS has_registered
  FROM   db_colegioae.person              cp
  JOIN   db_colegioae.student             s   ON s.personId              = cp.id
  JOIN   db_colegioae.enrollment          e   ON e.studentId             = s.id
  JOIN   db_colegioae.activity_classroom  ac  ON ac.id                   = e.activityClassroomId
  JOIN   db_colegioae.phase               ph  ON ph.id                   = ac.phaseId
  WHERE  e.status IN ('reserved', 'registered')
    AND  ph.yearId = {yearIdColegio}
  GROUP  BY cp.docNumber
) col ON col.docNumber = TRIM(p.doc_number)

WHERE  v.year_id = {yearId}
GROUP  BY v.level
ORDER  BY FIELD(v.level, 'inicial', 'primaria', 'secundaria')
```

### Parámetros

| Parámetro | BD | Descripción |
|---|---|---|
| `{yearId}` | bd_admision | ID del año en la tabla `year` del sistema de admisión |
| `{yearIdColegio}` | db_colegioae | ID del año en la tabla `phase` del colegio |

---

## Decisiones de diseño

### Por qué LEFT JOIN con subquery y no EXISTS correlated

Las columnas `reservados` y `matriculados` podrían haberse implementado con `EXISTS` correlated (como las columnas de secretaría y psicología), pero se eligió un **LEFT JOIN con subquery pre-agregado** porque:

- El `EXISTS` correlated ejecuta un subquery por **cada fila** del outer query
- El LEFT JOIN subquery ejecuta **una sola vez** y el resultado se reutiliza
- Con miles de postulantes, la diferencia de rendimiento es significativa

### Por qué `MAX(e.status = 'reserved')`

Un alumno puede tener múltiples `enrollment` en el mismo año (distintas aulas/materias). `MAX()` sobre una comparación booleana retorna `1` si **al menos una** fila cumple la condición, sin necesidad de DISTINCT adicional.

```
enrollment 1: status = 'reserved'   → expresión = 1
enrollment 2: status = 'registered' → expresión = 0
MAX() = 1  ✓
```

### Por qué `COLLATE` en el JOIN

Las dos bases de datos tienen collations distintas:
- `bd_admision` → `utf8mb4_0900_ai_ci`
- `db_colegioae` → `utf8mb4_unicode_ci`

Sin `COLLATE` explícito, MySQL lanza:
```
Error Code: 1267. Illegal mix of collations (utf8mb4_0900_ai_ci,IMPLICIT)
and (utf8mb4_unicode_ci,IMPLICIT) for operation '='
```

La solución fue forzar la collation de `db_colegioae` dentro del SELECT del subquery:
```sql
TRIM(cp.docNumber) COLLATE utf8mb4_0900_ai_ci AS docNumber
```

Para verificar las collations de cada BD:
```sql
SELECT SCHEMA_NAME, DEFAULT_COLLATION_NAME
FROM information_schema.SCHEMATA
WHERE SCHEMA_NAME IN ('bd_admision', 'db_colegioae');
```

---

## Bug encontrado: DNI duplicado en `person`

### Síntoma
El nivel `inicial` mostraba **5 reservados** cuando en realidad eran **4**.

### Causa
Existían dos registros distintos en la tabla `person` de `bd_admision` con el mismo `doc_number`. Uno de esos registros pertenecía a un niño de otro nivel que sí tenía reserva en `db_colegioae`. Al hacer el JOIN por DNI, el niño de "inicial" (que comparte el DNI duplicado) heredaba incorrectamente el `has_reserved = 1`.

### Query de diagnóstico utilizado

```sql
SELECT
  v.children_id,
  v.level            AS nivel_en_admision,
  p.doc_number       AS dni,
  p.name,
  p.lastname,
  COUNT(v.id)        AS cantidad_vacants
FROM vacant v
JOIN children c ON v.children_id = c.id
JOIN person   p ON c.person_id   = p.id
LEFT JOIN (
  SELECT
    TRIM(cp.docNumber) COLLATE utf8mb4_0900_ai_ci AS docNumber,
    MAX(e.status = 'reserved')                     AS has_reserved
  FROM   db_colegioae.person              cp
  JOIN   db_colegioae.student              s  ON s.personId           = cp.id
  JOIN   db_colegioae.enrollment           e  ON e.studentId          = s.id
  JOIN   db_colegioae.activity_classroom  ac  ON ac.id                = e.activityClassroomId
  JOIN   db_colegioae.phase               ph  ON ph.id                = ac.phaseId
  WHERE  e.status IN ('reserved', 'registered')
    AND  ph.yearId = 17
  GROUP  BY cp.docNumber
) col ON col.docNumber = TRIM(p.doc_number)
WHERE  v.year_id      = 3
  AND  v.level        = 'inicial'
  AND  col.has_reserved = 1
GROUP  BY v.children_id, p.doc_number, p.name, p.lastname, v.level
ORDER  BY cantidad_vacants DESC
```

### Lecciones
- Un conteo incorrecto **solo en un nivel** es señal de un problema de datos, no de lógica de query
- Los DNIs duplicados en `person` son un riesgo latente en reportes que cruzan BDs por DNI
- Se recomienda agregar una restricción `UNIQUE` sobre `doc_number` en la tabla `person` de `bd_admision` para prevenir futuros duplicados
