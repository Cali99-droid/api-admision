import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
const app = express();

app.use(express.json());
dotenv.config();

const dominiosPermitidos = [process.env.FRONTEND_URL];
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
app.use(cors(corsOptions));

app.use("/api", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`"server corriendo en el puerto: ${PORT}"`);
});
