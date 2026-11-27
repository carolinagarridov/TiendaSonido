import { Router } from "express";
import * as controlador from "../controllers/productosController.js";
import { validarProducto } from "../middlewares/validarProducto.js";

const router = Router();

router.get("/", controlador.listar);
router.get("/:id", controlador.obtener);
router.post("/", validarProducto, controlador.crear);
router.put("/:id", validarProducto, controlador.actualizar);
router.delete("/:id", controlador.eliminar);

export default router;