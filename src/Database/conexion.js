const mongoose = require("mongoose");

const conexion = () => {
  mongoose.connect("mongodb+srv://lvanegas1429:Luisvanegas1429@cluster0.1rw7iqy.mongodb.net/administracion", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Conexión a la base de datos exitosa");
    })
    .catch((err) => {
      console.error("Error al conectarse a la base de datos:", err);
    });
};

module.exports = conexion;
