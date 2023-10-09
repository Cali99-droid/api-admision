import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
import openApiConfigration from "./docs/swagger.js";
import swaggerUI from "swagger-ui-express";

const app = express();

app.use(express.json());
dotenv.config();

const dominiosPermitidos = [process.env.FRONTEND_URL, "http://localhost:3001"];
const corsOptions = {
  origin: function (origin, callback) {
    if (dominiosPermitidos.indexOf(origin) !== -1) {
      // El Origen del Request esta permitido
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
};
app.use(cors());
const PORT = process.env.PORT || 4000;

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
