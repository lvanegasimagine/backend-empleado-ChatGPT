const express = require("express");
const cors = require("cors");

// const v1Router = require("./v1/Routes");
const v1Departamento = require("./v1/Routes/departamento.routes");
const v1Empleado = require("./v1/Routes/empleado.routes")
const conexion = require("./Database/conexion");

const app = express();

conexion();
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración de rutas
// app.use("/api/v1", v1Router);
app.use("/api/v1/empleado", v1Empleado);
app.use("/api/v1/departamento", v1Departamento);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto ${PORT}`);
});
