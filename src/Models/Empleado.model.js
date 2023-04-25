const mongoose = require("mongoose");
// 64441aa62991fd6274682b34
const empleadoSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    hireDate: {
      type: Date,
      required: true,
    },
    departament: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departamento",
      required: true,
    },
  },
  { timestamps: true }
);

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
