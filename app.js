// IMPORTS
import express from "express";
import morgan from "morgan";

// import "./src/database/db.js";
import { settingDotEnv } from "./src/config.js";
import { indexRoutes } from "./src/routes/index.routes.js";
// Creo el servidor
const app = express();

// MIDDLEWARES
app.use(express.json());
app.use(morgan("dev"));
// Agrego la rutas que se van a usar en la aplicacion
app.use("/api/", indexRoutes);

const { port } = settingDotEnv();

// Se pone a la escucha el servidor
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
