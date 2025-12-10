import * as aws from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import loggerStream from "../utils/handleLogger.js";

const ses = new aws.SES({
  apiVersion: "2010-12-01",
  region: process.env.REGION,
  credentials: {
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  },
});

const transporter = nodemailer.createTransport({
  SES: { ses, aws },
  sendingRate: 1, // max 1 messages/second,
  maxConnections: 1,
});

export const deliverEmail = (toAddresses, name, childName, status) => {
  childNameCapitalized = capitalizeFirstLetter(childName);
  return new Promise(async (resolve, reject) => {
    transporter.sendMail(
      {
        // it should be verified email from AWS SES
        from: `"Admisión Colegio AE" <${process.env.AWS_SES_FROM}>`,
        to: toAddresses,
        subject: status
          ? `${childNameCapitalized} ha obtenido una vacante para el 2026`
          : "Comunicación del Proceso de Admisión 2026",
        html: generateBody(
          status,
          capitalizeFirstLetter(name),
          childNameCapitalized
        ),
        bcc: "admision@mail.colegioae.com",
        replyTo: "soporte@colegioae.freshdesk.com",
      },
      (err, info) => {
        transporter.close();
        resolve(true);
        if (err) {
          console.error(err);
        } else {
          console.log("send succesfully");
          loggerStream.write(
            `send ${
              status ? "APTO" : "NO APTO"
            } email succesfully ${new Date().toLocaleString()} from: ${
              info?.envelope.from
            } to: ${info?.envelope.to}
            student: ${childName}
            `
          );

          console.log(new Date().toLocaleString(), info?.envelope);
          console.log(info?.messageId);
        }
      }
    );
    resolve(true);
  });
};
/**
 * Helper para capitalizar la primera letra de cada palabra
 * @private
 */
function capitalizeFirstLetter(text) {
  if (!text) return "";
  return text
    .split(" ")
    .map((word) => {
      if (!word) return "";
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}
const generateBody = (status, name, childName) => {
  let year = new Date().getFullYear();
  let accepted = `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Colegio Albert Einstein – Vacante Obtenida</title>

  <!-- ESTILOS RESPONSIVE PARA CELULARES -->
  <style type="text/css">
    @media only screen and (max-width: 480px) {

      /* Ajusta el contenedor para móvil */
      table[class="container"] {
        width: 100% !important;
      }

      /* Incrementar tamaños de fuente globales */
      .main-text,
      p,
      td,
      div {
        font-size: 17px !important;
        line-height: 1.75 !important;
      }

      .small-text {
        font-size: 15px !important;
      }

      .tiny-text {
        font-size: 14px !important;
      }

      .header-title {
        font-size: 20px !important;
      }

      .subheader {
        font-size: 15px !important;
      }

      /* Botón más grande en celular */
      .btn-primary {
        font-size: 17px !important;
        padding: 16px 42px !important;
      }

      /* Más padding para respirar */
      .mobile-padding {
        padding: 22px 22px !important;
      }
    }
  </style>

</head>

<body style="margin:0; padding:0; background-color:#e3e8f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#e3e8f5; padding:20px 0;">
    <tr>
      <td align="center">

        <!-- CONTENEDOR PRINCIPAL -->
        <table width="640" cellpadding="0" cellspacing="0" border="0" class="container" style="background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #c8d0e4;">

          <!-- CABECERA COLEGIO AE -->
          <tr>
            <td align="center" style="background-color:#004aad; padding:18px 24px 10px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif;">
                    <div class="header-title" style="font-size:18px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">
                      Colegio Albert Einstein
                    </div>
                    <div class="small-text" style="font-size:12px; margin-top:4px; opacity:0.9;">
                      Área de Admisión
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BARRA DE COLORES -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:6px; background-color:#004aad;"></td>
                  <td style="height:6px; background-color:#d8b457;"></td>
                  <td style="height:6px; background-color:#e30b15;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TITULAR INTERNO -->
          <tr>
            <td class="mobile-padding" style="padding:18px 28px 14px 28px; background-color:#f6f7fc; border-bottom:1px solid #dde1f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, Helvetica, sans-serif;">
                    <div class="header-title" style="font-size:17px; font-weight:bold; color:#004aad; margin-bottom:4px;">
                      Colegio Albert Einstein
                    </div>
                    <div class="subheader small-text" style="font-size:12px; color:#555555; text-transform:uppercase; letter-spacing:0.8px;">
                      proceso de admisión 2026
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENIDO PRINCIPAL -->
          <tr>
            <td class="mobile-padding" style="padding:22px 28px 20px 28px; background-color:#ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="main-text" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#222222; line-height:1.7;">

                    <p style="margin:0 0 10px 0;">
                      Estimado ${name}:
                    </p>

                    <p style="margin:0 0 14px 0;">
                      Nos es grato informarle que su hijo(a) ${childName} ha obtenido una vacante para el año académico 2026. Agradecemos la confianza depositada y le damos la bienvenida a nuestra comunidad educativa.
                    </p>

                    <!-- BLOQUE DESTACADO -->
                    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 18px 0;">
                      <tr>
                        <td style="background-color:#f6f7fc; border:1px solid #dde1f0; border-radius:8px; padding:10px 12px;">
                          <div class="tiny-text" style="font-size:11px; font-weight:bold; color:#004aad; text-transform:uppercase; letter-spacing:0.8px; margin-bottom:4px;">
                            Siguiente paso en el proceso:
                          </div>
                          <div class="main-text" style="font-size:13px; color:#444444;">
                            Acérquese a Secretaría para gestionar la Constancia de Vacante.<br>
                            Realizar el <strong>pago de S/ 100.00</strong> por el trámite de reserva de vacante. (Este monto será descontado del pago de matrícula.)<br>
                            Es importante realizar este trámite dentro de las próximas <strong>72 horas</strong> de recibida esta comunicación. Pasado dicho plazo, la vacante será reasignada y no podrá completarse este procedimiento.
                          </div>
                        </td>
                      </tr>
                    </table>

                    <!-- SECCIÓN 1 -->
                    <p style="margin:0 0 10px 0;">
                      Una vez emitida la Constancia de Vacante, podrá iniciar el proceso de traslado formal en la institución educativa de origen.
                    </p>
                    <p style="margin:0 0 10px 0;">
                      Horario de atención – Secretaría Central (Jr. Huaylas 245)<br>
                      Lunes a viernes, de 8:00 a 1:00 p. m. y de 3:00 a 6:00 p. m.
                    </p>
                    <p style="margin:0 0 10px 0;">
                      Quedamos a su disposición para cualquier consulta o acompañamiento durante este proceso.
                    </p>

                    

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PIE -->
          <tr>
            <td style="background-color:#004aad; padding:14px 28px 8px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, Helvetica, sans-serif; color:#ffffff; font-size:12px;">
                    <p style="margin:0 0 4px 0;">
                      <strong>Área de Admisión</strong><br>
                      Colegio Albert Einstein
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" class="small-text" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#e0e4f5; padding-top:6px; border-top:1px solid rgba(255,255,255,0.35);">
                    ©${year} Todos los derechos reservados.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>

`;

  let deny = `
  <!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Colegio Albert Einstein – Políticas de admisión 2026</title>

  <!-- ESTILOS RESPONSIVE PARA CELULARES -->
  <style type="text/css">
    @media only screen and (max-width: 480px) {

      /* Ajusta el contenedor para móvil */
      table[class="container"] {
        width: 100% !important;
      }

      /* Incrementar tamaños de fuente globales */
      .main-text,
      p,
      td,
      div {
        font-size: 17px !important;
        line-height: 1.75 !important;
      }

      .small-text {
        font-size: 15px !important;
      }

      .tiny-text {
        font-size: 14px !important;
      }

      .header-title {
        font-size: 20px !important;
      }

      .subheader {
        font-size: 15px !important;
      }

      /* Botón más grande en celular */
      .btn-primary {
        font-size: 17px !important;
        padding: 16px 42px !important;
      }

      /* Más padding para respirar */
      .mobile-padding {
        padding: 22px 22px !important;
      }
    }
  </style>

</head>

<body style="margin:0; padding:0; background-color:#e3e8f5;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" align="center" style="background-color:#e3e8f5; padding:20px 0;">
    <tr>
      <td align="center">

        <!-- CONTENEDOR PRINCIPAL -->
        <table width="640" cellpadding="0" cellspacing="0" border="0" class="container" style="background-color:#ffffff; border-radius:10px; overflow:hidden; border:1px solid #c8d0e4;">

          <!-- CABECERA COLEGIO AE -->
          <tr>
            <td align="center" style="background-color:#004aad; padding:18px 24px 10px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td align="left" style="color:#ffffff; font-family:Arial, Helvetica, sans-serif;">
                    <div class="header-title" style="font-size:18px; font-weight:bold; text-transform:uppercase; letter-spacing:1px;">
                      Colegio Albert Einstein
                    </div>
                    <div class="small-text" style="font-size:12px; margin-top:4px; opacity:0.9;">
                      Área de Admisión
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- BARRA DE COLORES -->
          <tr>
            <td>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="height:6px; background-color:#004aad;"></td>
                  <td style="height:6px; background-color:#d8b457;"></td>
                  <td style="height:6px; background-color:#e30b15;"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- TITULAR INTERNO -->
          <tr>
            <td class="mobile-padding" style="padding:18px 28px 14px 28px; background-color:#f6f7fc; border-bottom:1px solid #dde1f0;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, Helvetica, sans-serif;">
                    <div class="header-title" style="font-size:17px; font-weight:bold; color:#004aad; margin-bottom:4px;">
                      Colegio Albert Einstein
                    </div>
                    <div class="subheader small-text" style="font-size:12px; color:#555555; text-transform:uppercase; letter-spacing:0.8px;">
                      proceso de admisión 2026
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CONTENIDO PRINCIPAL -->
          <tr>
            <td class="mobile-padding" style="padding:22px 28px 20px 28px; background-color:#ffffff;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="main-text" style="font-family:Arial, Helvetica, sans-serif; font-size:14px; color:#222222; line-height:1.7;">

                    <p style="margin:0 0 10px 0;">
                      Estimado ${name}:
                    </p>

                  <p style="margin:0 0 14px 0;">
                    Luego de completar el proceso de evaluación, le informamos que en esta oportunidad ${childName} <strong>no ha obtenido</strong> una vacante para el año académico 2026.
                  </p>

                    <!-- SECCIÓN 1 -->
                    <p style="margin:0 0 10px 0;">
                      Agradecemos sinceramente el interés y el tiempo que su familia dedicó durante este proceso. La decisión se basa en los criterios establecidos en nuestras políticas de admisión.
                    </p>

                    <p style="margin:0 0 10px 0;">
                      Si en el futuro desean volver a participar en un nuevo proceso, estaremos gustosos de recibir su solicitud.
                    </p>

                    <p style="margin:0 0 10px 0;">
                      Quedamos a su disposición para cualquier consulta o acompañamiento adicional.
                    </p>

                    

                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- PIE -->
          <tr>
            <td style="background-color:#004aad; padding:14px 28px 8px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="font-family:Arial, Helvetica, sans-serif; color:#ffffff; font-size:12px;">
                    <p style="margin:0 0 4px 0;">
                      <strong>Área de Admisión</strong><br>
                      Colegio Albert Einstein
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" class="small-text" style="font-family:Arial, Helvetica, sans-serif; font-size:11px; color:#e0e4f5; padding-top:6px; border-top:1px solid rgba(255,255,255,0.35);">
                    ©${year} Todos los derechos reservados.
                  </td>
                </tr>
              </table>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>

`;

  if (status) {
    return accepted;
  }

  return deny;
};
