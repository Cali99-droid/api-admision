import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";
const app = express();

app.use(cors());
app.use(express.json());
dotenv.config();

app.use("/api", router);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`"server corriendo en el puerto: ${PORT}"`);
});
