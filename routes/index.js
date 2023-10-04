import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
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
export default router;
