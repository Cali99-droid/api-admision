# Solución al Problema de Reutilización de Familias en Postulaciones

## 📋 DESCRIPCIÓN DEL PROBLEMA

### Problema Original
Los usuarios están reutilizando familias creadas en años anteriores para postular nuevos hijos en el año activo actual. Esto causa conflictos porque:

1. **Las evaluaciones previas persisten**: La familia ya tiene evaluaciones psicológicas, económicas y de antecedentes de años anteriores
2. **Hijos antiguos con vacantes asignadas**: Los hijos de años anteriores mantienen sus vacantes, aunque sean de otros años
3. **Proceso contaminado**: El sistema no distingue entre procesos del año actual y años anteriores

### Ejemplo del Problema
```
Familia "García" - Año 2024:
├─ Hijo 1: Juan (vacante asignada 2024)
├─ Evaluación Psicológica: Aprobada (2024)
├─ Evaluación Económica: Apto (2024)
└─ Evaluación Antecedentes: Apto (2024)

Familia "García" - Año 2025 (REUTILIZADA):
├─ Hijo 1: Juan (vacante asignada 2024) ❌ APARECE
├─ Hijo 2: María (nuevo postulante 2025) ✅ NUEVO
├─ Evaluación Psicológica: Aprobada (2024) ❌ DEL AÑO ANTERIOR
├─ Evaluación Económica: Apto (2024) ❌ DEL AÑO ANTERIOR
└─ Evaluación Antecedentes: Apto (2024) ❌ DEL AÑO ANTERIOR

RESULTADO: María aparece "evaluada" sin haber pasado por ningún proceso
```

---

## ✅ SOLUCIÓN IMPLEMENTADA

### Estrategia: Aislamiento por Año Activo

La solución consiste en **agregar el campo `year_id` a todas las evaluaciones** y **filtrar TODAS las consultas por el año activo**. De esta forma:

- Cada evaluación está vinculada a un año específico
- Las consultas solo traen datos del año activo
- Las familias pueden reutilizarse sin contaminar años diferentes
- No se requiere migración de datos existentes

---

## 🔧 CAMBIOS REALIZADOS

### 1. Modificación del Schema de Prisma

**Archivo modificado:** `prisma/schema.prisma`

#### Cambios en `economic_evaluation`:
```prisma
model economic_evaluation {
  id          Int                             @id @default(autoincrement())
  result      economic_evaluation_result?
  comment     String?                         @db.Text
  conclusion  economic_evaluation_conclusion?
  create_time DateTime?                       @default(now()) @db.Timestamp(0)
  update_time DateTime?                       @db.Timestamp(0)
  family_id   Int
  year_id     Int?                            // ✅ NUEVO CAMPO
  family      family                          @relation(fields: [family_id], references: [id], onDelete: Cascade)
  year        year?                           @relation(fields: [year_id], references: [id]) // ✅ NUEVA RELACIÓN

  @@index([family_id])
  @@index([year_id])                          // ✅ NUEVO ÍNDICE
}
```

#### Cambios en `background_assessment`:
```prisma
model background_assessment {
  id          Int                               @id @default(autoincrement())
  comment     String?                           @db.Text
  conclusion  background_assessment_conclusion?
  create_time DateTime?                         @default(now()) @db.Timestamp(0)
  update_time DateTime?                         @db.Timestamp(0)
  family_id   Int
  year_id     Int?                              // ✅ NUEVO CAMPO
  family      family                            @relation(fields: [family_id], references: [id], onDelete: Cascade)
  year        year?                             @relation(fields: [year_id], references: [id]) // ✅ NUEVA RELACIÓN

  @@index([family_id])
  @@index([year_id])                            // ✅ NUEVO ÍNDICE
}
```

#### Cambios en `year`:
```prisma
model year {
  id                    Int                     @id @default(autoincrement())
  name                  String                  @unique
  dateStart             DateTime?
  dateEnd               DateTime?
  created_at            DateTime?               @default(now())
  updated_at            DateTime?               @default(now())
  status                Boolean                 @default(true)
  familiy_secretary     familiy_secretary[]
  psy_evaluation        psy_evaluation[]
  vacant                vacant[]
  background_assessment background_assessment[] // ✅ NUEVA RELACIÓN
  economic_evaluation   economic_evaluation[]   // ✅ NUEVA RELACIÓN
}
```

---

### 2. Script de Migración SQL

**Archivo creado:** `migrations/add_year_id_to_evaluations.sql`

Este script agrega las columnas `year_id` a las tablas de evaluación:

```sql
-- 1. Agregar columna year_id a economic_evaluation
ALTER TABLE `economic_evaluation`
ADD COLUMN `year_id` INT NULL AFTER `family_id`,
ADD INDEX `fk_economic_evaluation_year1_idx` (`year_id` ASC);

-- 2. Agregar foreign key constraint
ALTER TABLE `economic_evaluation`
ADD CONSTRAINT `fk_economic_evaluation_year1`
  FOREIGN KEY (`year_id`)
  REFERENCES `year` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- 3. Agregar columna year_id a background_assessment
ALTER TABLE `background_assessment`
ADD COLUMN `year_id` INT NULL AFTER `family_id`,
ADD INDEX `fk_background_assessment_year1_idx` (`year_id` ASC);

-- 4. Agregar foreign key constraint
ALTER TABLE `background_assessment`
ADD CONSTRAINT `fk_background_assessment_year1`
  FOREIGN KEY (`year_id`)
  REFERENCES `year` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
```

---

### 3. Repositorios Actualizados

#### `PsychologyRepository.js`
```javascript
// Antes: No filtraba evaluaciones antiguas
async getFamilyById(familyId) {
  return prisma.family.findUnique({
    where: { id: familyId },
    select: {
      psy_evaluation: true,  // ❌ Trae evaluaciones de todos los años
      vacant: true
    }
  });
}

// Después: Filtra solo año activo
async getFamilyById(familyId, yearId) {
  return prisma.family.findUnique({
    where: { id: familyId },
    select: {
      psy_evaluation: {
        where: { year_id: yearId }  // ✅ Solo año activo
      },
      vacant: {
        where: { year_id: yearId }  // ✅ Solo año activo
      }
    }
  });
}
```

#### `SecretaryRepository.js`
```javascript
async getFamilyById(familyId, yearId) {
  return prisma.family.findUnique({
    where: { id: familyId },
    select: {
      psy_evaluation: {
        where: { year_id: yearId }
      },
      vacant: {
        where: { year_id: yearId }
      }
    }
  });
}
```

#### `FamilyRepository.js`
```javascript
// Método crítico actualizado
async getFamiliesWithEvaluationsApproved(yearId) {
  return prisma.family.findMany({
    where: {
      psy_evaluation: {
        some: {
          approved: 1,
          year_id: yearId  // ✅ Filtra por año
        }
      },
      economic_evaluation: {
        some: {
          conclusion: "apto",
          year_id: yearId  // ✅ Filtra por año
        }
      },
      background_assessment: {
        some: {
          conclusion: "apto",
          year_id: yearId  // ✅ Filtra por año
        }
      }
    },
    include: {
      psy_evaluation: {
        where: { year_id: yearId }  // ✅ Solo incluye del año activo
      },
      economic_evaluation: {
        where: { year_id: yearId }
      },
      background_assessment: {
        where: { year_id: yearId }
      }
    }
  });
}
```

#### `EconomicRepository.js`
```javascript
async getEconomicByFamily(familyId, yearId) {
  return prisma.economic_evaluation.findFirst({
    where: {
      family_id: familyId,
      year_id: yearId  // ✅ Solo año activo
    }
  });
}
```

#### `AntecedentRepository.js`
```javascript
async getAntecedentByFamily(familyId, yearId) {
  return prisma.background_assessment.findFirst({
    where: {
      family_id: familyId,
      year_id: yearId  // ✅ Solo año activo
    }
  });
}
```

---

### 4. Controladores Actualizados

#### `PsychologyController.js`
```javascript
const getFamily = async (req, res) => {
  const id = parseInt(req.id);

  const yearActive = await prisma.year.findFirst({
    where: { status: true }
  });

  const family = await PsychologyRepository.getFamilyById(
    id,
    yearActive.id  // ✅ Pasa year_id
  );

  res.json({ success: true, data: family });
};
```

#### `EconomicController.js`
```javascript
const getEconomic = async (req, res) => {
  const { familyId } = req.params;

  const yearActive = await prisma.year.findFirst({
    where: { status: true }
  });

  const economic = await EconomicRepository.getEconomicByFamily(
    parseInt(familyId),
    yearActive.id  // ✅ Pasa year_id
  );

  res.json({ success: true, data: economic });
};

const createEconomic = async (req, res) => {
  const data = matchedData(req);

  const yearActive = await prisma.year.findFirst({
    where: { status: true }
  });

  data.year_id = yearActive.id;  // ✅ Asigna año activo

  const economic = await EconomicRepository.createEconomic(data);
  res.json({ success: true, data: economic });
};
```

#### `AntecedentController.js`
```javascript
const getAntecedent = async (req, res) => {
  const { familyId } = req.params;

  const yearActive = await prisma.year.findFirst({
    where: { status: true }
  });

  const antecedent = await AntecedentRepository.getAntecedentByFamily(
    parseInt(familyId),
    yearActive.id  // ✅ Pasa year_id
  );

  res.json({ success: true, data: antecedent });
};

const createAntecedent = async (req, res) => {
  const data = matchedData(req);

  const yearActive = await prisma.year.findFirst({
    where: { status: true }
  });

  data.year_id = yearActive.id;  // ✅ Asigna año activo

  const antecedent = await AntecedentRepository.createAntecedent(data);
  res.json({ success: true, data: antecedent });
};
```

---

## 🚀 PASOS DE IMPLEMENTACIÓN

### 1. Ejecutar Migración de Base de Datos
```bash
# Opción A: Usar el script SQL directamente
mysql -u usuario -p nombre_base_datos < migrations/add_year_id_to_evaluations.sql

# Opción B: Usar Prisma (requiere generar migración primero)
npx prisma migrate dev --name add_year_id_to_evaluations
```

### 2. Regenerar Cliente de Prisma
```bash
npx prisma generate
```

### 3. Reiniciar el Servidor
```bash
npm run dev
# o
pm2 restart api_admision
```

---

## ✅ RESULTADO ESPERADO

### Antes de la Solución
```
GET /family/123
{
  "id": 123,
  "name": "García",
  "children": [
    { "id": 1, "name": "Juan", "vacant": [{ "year": 2024 }] },  // ❌ Año anterior
    { "id": 2, "name": "María", "vacant": [{ "year": 2025 }] }  // ✅ Año actual
  ],
  "psy_evaluation": { "approved": 1, "year_id": null },  // ❌ Del 2024
  "economic_evaluation": { "conclusion": "apto", "year_id": null }  // ❌ Del 2024
}
```

### Después de la Solución
```
GET /family/123  (con año activo = 2025)
{
  "id": 123,
  "name": "García",
  "children": [
    { "id": 2, "name": "María", "vacant": [{ "year": 2025 }] }  // ✅ Solo año actual
  ],
  "psy_evaluation": null,  // ✅ No hay evaluación para 2025 aún
  "economic_evaluation": null  // ✅ No hay evaluación para 2025 aún
}
```

Ahora la familia aparece "limpia" para el año 2025, como si fuera nueva, permitiendo que María pase por todo el proceso de evaluación correctamente.

---

## 📊 IMPACTO

### Tablas Modificadas
- ✅ `economic_evaluation` - Agregado `year_id`
- ✅ `background_assessment` - Agregado `year_id`
- ✅ `year` - Agregadas relaciones

### Archivos Modificados
1. `prisma/schema.prisma`
2. `repositories/PsychologyRepository.js`
3. `repositories/SecretaryRepository.js`
4. `repositories/FamilyRepository.js`
5. `repositories/EconomicRepository.js`
6. `repositories/AntecedentRepository.js`
7. `controllers/PsychologyController.js`
8. `controllers/EconomicController.js`
9. `controllers/AntecedentController.js`

### Archivos Creados
1. `migrations/add_year_id_to_evaluations.sql`
2. `SOLUCION_REUTILIZACION_FAMILIAS.md` (este archivo)

---

## ⚠️ CONSIDERACIONES IMPORTANTES

### 1. Datos Existentes
- Las evaluaciones existentes tendrán `year_id = NULL`
- Estas NO aparecerán en consultas que filtren por año activo
- Si necesitas asignarles un año, ejecuta el UPDATE comentado en el script SQL

### 2. Compatibilidad Hacia Atrás
- Los registros antiguos con `year_id = NULL` no se romperán
- Las consultas solo traerán registros del año activo
- No se requiere limpiar datos históricos

### 3. Año Activo
- SIEMPRE debe haber UN año con `status = true`
- Si no hay año activo, las consultas fallarán
- Recomendación: Validar existencia de año activo en middleware

### 4. Nuevas Evaluaciones
- TODAS las evaluaciones creadas desde ahora DEBEN tener `year_id`
- Los controladores ya están actualizados para asignarlo automáticamente

---

## 🔍 TESTING

### Casos de Prueba Recomendados

1. **Crear familia nueva en año activo**
   - Verificar que todas las evaluaciones se crean con `year_id` correcto

2. **Reutilizar familia de año anterior**
   - Agregar nuevo hijo
   - Verificar que NO aparezcan evaluaciones antiguas
   - Crear nuevas evaluaciones
   - Verificar que se asigna `year_id` del año activo

3. **Cambiar año activo**
   - Desactivar año actual (`status = false`)
   - Activar nuevo año (`status = true`)
   - Verificar que las consultas traigan datos del nuevo año

4. **Consultas de reportes**
   - Verificar que solo se muestren familias con evaluaciones del año activo
   - Verificar que los hijos mostrados tengan vacantes del año activo

---

## 🎯 PRÓXIMOS PASOS (OPCIONAL)

### Mejoras Futuras para la Nueva Versión

1. **Modelo de Postulación por Año**
   - Crear tabla `application` que vincule familia + año
   - Mover todas las evaluaciones a depender de `application_id` en lugar de `family_id`

2. **Historial de Postulaciones**
   - Vista unificada de todas las postulaciones de una familia
   - Comparación año a año

3. **Validaciones de Negocio**
   - Impedir crear evaluaciones sin año activo
   - Middleware para validar año activo en todas las rutas

4. **Dashboard por Año**
   - Selector de año en el frontend
   - Estadísticas y reportes filtrados por año

---

## 👥 SOPORTE

Para dudas o problemas con esta implementación, revisar:
- Este documento
- Código en los archivos modificados
- Script de migración SQL
- Logs del servidor durante la migración

---

**Fecha de Implementación:** 2025-12-05
**Versión:** 1.0
**Autor:** Claude Code
**Estado:** ✅ Implementado y documentado
