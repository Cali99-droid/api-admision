import * as aws from "@aws-sdk/client-ses";
import nodemailer from "nodemailer";
import loggerStream from "../utils/handleLogger";
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
  return new Promise(async (resolve, reject) => {
    transporter.sendMail(
      {
        // it should be verified email from AWS SES
        from: `"Admisión Colegio AE" <${process.env.AWS_SES_FROM}>`,
        to: toAddresses,
        subject: "ESTADO DE VACANTE",
        html: generateBody(status, name, childName),
      },
      (err, info) => {
        transporter.close();
        resolve(true);
        if (err) {
          console.error(err);
        } else {
          console.log("send succesfully");
          loggerStream.write(
            `send ${status ? "APTO" : "NO APTO"}
            email succesfully ${new Date().toLocaleString()} ${info?.envelope} `
          );

          console.log(new Date().toLocaleString(), info?.envelope);
          console.log(info?.messageId);
        }
      }
    );
    resolve(true);
  });
};

const generateBody = (status, name, childName) => {
  let accepted = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vacante Obtenida</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #4caf50;
            color: white;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #777;
            margin-top: 20px;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            color: white;
            background-color: #4caf50;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>¡Felicitaciones!</h1>
        </div>
        <p>Estimado/a ${name},</p>
        <p>
            El Colegio ALBERT EINSTEIN Huaraz, extiende a Ud. y familia su saludo cordial.
        </p>

         <p>
         En este día especial estamos contentos por haber concluido exitosamente el proceso de admisión, le damos la bienvenida a Ud. y su familia a ser parte desde ya, de nuestra comunidad einstina, no dude en contactarnos ante cualquier inquietud, estamos para ayudarlo.
        </p>

         <strong> Alumno: ${childName} </strong> 
        <p>
            Es importante que usted se acerque a secretaria a efectuar la <strong>RESERVA DE VACANTE</strong> dentro de las 48 horas.
        </p>
        
         <p>
            La reserva de vacante tiene un costo de <strong>S/ 80.00</strong>, monto que será descontado de la matrícula.
         </p>
           <p>
            Adjuntando la <strong>RESERVA DE VACANTE</strong>, debe iniciar el tramite de traslado formal en el colegio actual de su menor hijo.
        </p>

        <p>Puede acercarse a nuestras secretarías en horario de oficina 8:00 a 1:00pm y 3:00 - 6:00pm</p>
        <p>Atentamente,</p>
        <p><strong>Comisión de Admisión</strong></p>
        <p><strong>Colegio Albert Einstein</strong></p>
        <div class="footer">
            &copy; 2025 Colegio Albert Einstein. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>
`;

  let deny = `
  <!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vacante No Obtenida</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f9;
            color: #333;
            line-height: 1.6;
            margin: 0;
            padding: 0;
        }
        .container {
            max-width: 600px;
            margin: 20px auto;
            padding: 20px;
            background: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            background-color: #f44336;
            color: white;
            padding: 10px 0;
            border-radius: 8px 8px 0 0;
        }
        .footer {
            text-align: center;
            font-size: 0.9em;
            color: #777;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Información sobre la Vacante</h1>
        </div>
        <p>Estimado/a ${name},</p>
        <p>Reciba un cordial saludo. Me dirijo a ustedes en mi calidad de Coordinador del Proceso de Admisión, con el propósito de comunicarles una actualización importante respecto al proceso de solicitud de vacantes en Colegio ALBERT EINSTEIN.</p>
        <p>Luego de un exhaustivo proceso de revisión y evaluación de todas las solicitudes recibidas, lamentamos informarles que en esta ocasión no hemos podido asignar una vacante para: ${childName} </p>
        <p>Somos conscientes de que esta noticia puede ser decepcionante, y queremos asegurarles que esta decisión no refleja de ninguna manera una valoración negativa hacia su familia. La selección fue respetando estrictamente los criterios de admisión.</p>
        <p>Agradecemos sinceramente el tiempo y esfuerzo que han dedicado a este proceso y valoramos su interés en ser parte de nuestra institución. Les animamos a considerar la posibilidad de volver a aplicar en el futuro, si así lo desean.</p> 
        <p>Agradeciendo su comprensión y deseándoles lo mejor, me despido cordialmente.</p>
        <p>Atentamente,</p>
        <p><strong>Colegio Albert Einstein</strong></p>
        <p><strong>Comite Evaluador</strong></p>
        <div class="footer">
            &copy; 2025 Colegio Albert Einstein. Todos los derechos reservados.
        </div>
    </div>
</body>
</html>
`;

  if (status) {
    return accepted;
  }

  return deny;
};
