// IMPORTS
import express from "express";

// import "./src/database/db.js";
import { settingDotEnv } from "./src/config.js";
// Creo el servidor
const app = express();

// MIDDLEWARES
app.use(express.json());

const { port } = settingDotEnv();

// Se pone a la escucha el servidor
app.listen(port, () => console.log(`Servidor corriendo en el puerto ${port}`));
