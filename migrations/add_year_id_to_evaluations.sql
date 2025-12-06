-- Migración para agregar year_id a las tablas de evaluación económica y de antecedentes
-- Fecha: 2025-12-05
-- Propósito: Permitir el aislamiento de evaluaciones por año para evitar conflictos
--            cuando las familias reutilizan su registro para postulaciones en años diferentes

-- 1. Agregar columna year_id a economic_evaluation
ALTER TABLE `economic_evaluation`
ADD COLUMN `year_id` INT NULL AFTER `family_id`,
ADD INDEX `fk_economic_evaluation_year1_idx` (`year_id` ASC);

-- 2. Agregar foreign key constraint para economic_evaluation
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

-- 4. Agregar foreign key constraint para background_assessment
ALTER TABLE `background_assessment`
ADD CONSTRAINT `fk_background_assessment_year1`
  FOREIGN KEY (`year_id`)
  REFERENCES `year` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

-- 5. Actualizar registros existentes con el año activo (si existe)
-- NOTA: Este paso es opcional y debe ejecutarse solo si quieres asignar
-- el año activo actual a las evaluaciones existentes

-- Descomentar las siguientes líneas si deseas actualizar registros existentes:
-- UPDATE economic_evaluation ee
-- SET ee.year_id = (SELECT id FROM year WHERE status = true LIMIT 1)
-- WHERE ee.year_id IS NULL;

-- UPDATE background_assessment ba
-- SET ba.year_id = (SELECT id FROM year WHERE status = true LIMIT 1)
-- WHERE ba.year_id IS NULL;
