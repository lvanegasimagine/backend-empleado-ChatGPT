const mongoose = require("mongoose");

const departamentoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
        default: ''
      },
    ],
  },
  { timestamps: true }
);

const Departamento = mongoose.model("Departamento", departamentoSchema);

module.exports = Departamento;
