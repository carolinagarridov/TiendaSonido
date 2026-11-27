import express from "express";
import cors from "cors";
import productosRoutes from "./routes/productosRoutes.js";
import { logger } from "./middlewares/logger.js";
import { rutaNoEncontrada, manejadorErrores } from "./middlewares/errores.js";

const app = express();
const PUERTO = 3000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());
app.use(logger);

app.use("/api/v1/productos", productosRoutes);

app.use(rutaNoEncontrada);
app.use(manejadorErrores);

app.listen(PUERTO, () => {
  console.log(`API TiendaSonido escuchando en http://localhost:${PUERTO}/api/v1/productos`);
});