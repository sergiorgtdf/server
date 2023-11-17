import { Router } from "express";

export const indexRoutes = Router();

// RUTAS - ENDPOINTS

indexRoutes.get("/", (req, res) => {
    res.send("Pagina de Inicio");
});
