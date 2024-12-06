import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { ensureAuthenticated } from "../middleware/ensureAuthenticated.js";

const __filename = fileURLToPath(import.meta.url);
const router = express.Router();

const PATH_ROUTES = path.dirname(__filename);

const removeExtension = (fileName) => {
  // TODO tracks.js [tracks, js]
  return fileName.split(".").shift();
};

const loadRoutes = async () => {
  try {
    fs.promises
      .readdir(PATH_ROUTES)
      .then((files) => {
        for (const file of files) {
          const name = removeExtension(file);
          if (name !== "index") {
            console.log(`Cargando ruta ${name}`);
            import(`./${file}`)
              .then((routeModule) => {
                router.use(`/${name}`, routeModule.default);
              })
              .catch((error) => {
                console.error(`Error al cargar ruta ${name}:`, error);
              });
          }
        }
      })
      .catch((error) => {
        console.error("Error al leer directorio:", error);
      });
  } catch (error) {
    console.error("Error al cargar rutas:", error);
  }
};
loadRoutes();
// Aplica autenticación globalmente a todas las rutas, excepto a /login y /callback

router.use((req, res, next) => {
  const openRoutes = [
    "/cities/district",
    "/cities/province",
    "/cities/region",
    "/check/available",
    "/spouse/person",
  ];
  if (openRoutes.includes(req.path)) {
    return next(); // No aplicar autenticación a rutas abiertas
  }
  ensureAuthenticated()(req, res, next); // Aplica autenticación a otras rutas
});
export default router;
