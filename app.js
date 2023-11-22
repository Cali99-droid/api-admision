import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import openApiConfigration from "./docs/swagger.js";
import swaggerUI from "swagger-ui-express";
import cron from "node-cron";
import prisma from "./utils/prisma.js";
const app = express();

app.use(express.json());
dotenv.config();

const dominiosPermitidos = [process.env.FRONTEND_URL, "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del Request esta permitido http://api.dev-solware.com/ sudo certbot --nginx -d api.dev-solware.com

      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors());
const PORT = process.env.PORT || 4000;
/**
 * Cron para eliminar usuario no confirmados
 */
cron.schedule("0 0 */2 * *", async () => {
  const threeDaysAgo = new Date();
  threeDaysAgo.setDate(threeDaysAgo.getDate() - 2);

  try {
    const unconfirmedUsers = await prisma.user.findMany({
      where: {
        confirmed_email: 0,
        create_time: { lt: threeDaysAgo },
        mauticId: {
          not: null,
        },
      },
    });
    console.log(unconfirmedUsers);
    if (unconfirmedUsers.length === 0) {
      console.log("No unconfirmed users to clean up.");
      return;
    }
    console.log(`Cleaning up ${unconfirmedUsers.length} unconfirmed users...`);
    const personIds = unconfirmedUsers.map((user) => user.person_id);
    console.log(personIds);
    await prisma.person
      .deleteMany({
        where: {
          id: {
            in: personIds,
          },
        },
      })
      .then(
        () => console.log("Completed Unconfirmed users cleaned up."),
        (r) => {
          console.log("error" + r);
        }
      );

    console.log("Unconfirmed users cleaned up.");
  } catch (error) {
    console.error("Error al eliminar usuarios:", error);
  }
});
/**
 * Definir ruta de documentación
 */

app.use(
  "/documentation",
  swaggerUI.serve,
  swaggerUI.setup(openApiConfigration)
);
// app.use(customMiddleware);
/**
 * Aqui invocamos a las rutas! 😎
 */
app.use("/api", router);

app.listen(PORT, () => {
  console.log(`"server corriendo en el puerto: ${PORT}"`);
});
