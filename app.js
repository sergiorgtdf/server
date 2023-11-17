// IMPORTS
import express from "express";

// Creo el servidor
const app = express();

// MIDDLEWARES
app.use(express.json());

const port = 0;

// Se pone a la escucha el servidor
app.listen(4000, () => console.log(`Servidor corriendo en el puerto ${port}`));
