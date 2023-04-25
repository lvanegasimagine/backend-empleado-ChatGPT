const mongoose = require("mongoose");

const puestoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    salarioBase: {
      type: Number,
      required: true,
    },
    funciones: {
      type: [String],
      required: true,
    },
    departamento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamento",
    },
  },
  { timestamps: true }
);

const Puesto = mongoose.model("Puesto", puestoSchema);

module.exports = Puesto;
