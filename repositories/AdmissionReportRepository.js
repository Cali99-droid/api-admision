import prisma from "../utils/prisma.js";

class AdmissionReportRepository {
  async getReport(yearName) {
    const conceptId = parseInt(process.env.RESERVATION_CONCEPT_ID);

    const data = await prisma.$queryRaw`
      SELECT
        v.level,
        COUNT(DISTINCT v.children_id)                                          AS registrados,
        COUNT(DISTINCT CASE
          WHEN EXISTS(
            SELECT 1 FROM familiy_secretary fs
            WHERE fs.family_id = c.family_id
              AND fs.year_id   = (SELECT id FROM year WHERE name = ${yearName})
              AND fs.status    = 1
          ) THEN v.children_id END)                                            AS atendidos_secretaria,
        COUNT(DISTINCT CASE
          WHEN EXISTS(
            SELECT 1 FROM psy_evaluation pe
            WHERE pe.family_id = c.family_id
              AND pe.year_id   = (SELECT id FROM year WHERE name = ${yearName})
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
      LEFT JOIN (
        SELECT
          TRIM(cp.docNumber) COLLATE utf8mb4_0900_ai_ci  AS docNumber,
          MAX(py.id IS NOT NULL)                          AS has_reserved,
          MAX(e.status = 'registered')                    AS has_registered
        FROM   db_colegioae.person               cp
        JOIN   db_colegioae.student              s   ON s.personId   = cp.id
        LEFT JOIN db_colegioae.payment           py  ON py.studentId = s.id
                                                    AND py.conceptId = ${conceptId}
                                                    AND py.yearId    = (SELECT id FROM db_colegioae.year WHERE name = ${yearName})
        LEFT JOIN db_colegioae.enrollment        e   ON e.studentId  = s.id
        LEFT JOIN db_colegioae.activity_classroom ac ON ac.id        = e.activityClassroomId
        LEFT JOIN db_colegioae.phase             ph  ON ph.id        = ac.phaseId
                                                    AND ph.yearId    = (SELECT id FROM db_colegioae.year WHERE name = ${yearName})
        WHERE  py.id IS NOT NULL
           OR  (e.status = 'registered' AND ph.id IS NOT NULL)
        GROUP  BY cp.docNumber
      ) col ON col.docNumber = TRIM(p.doc_number)
      WHERE  v.year_id = (SELECT id FROM year WHERE name = ${yearName})
      GROUP  BY v.level
      ORDER  BY FIELD(v.level, 'inicial', 'primaria', 'secundaria')
    `;

    data.forEach((row) => {
      for (const key in row) {
        if (typeof row[key] === "bigint") row[key] = Number(row[key]);
      }
    });

    return data;
  }
}

export default new AdmissionReportRepository();
