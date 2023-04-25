const Departamento = require("../Models/Departamento.model");
const Empleado = require("../Models/Empleado.model");

const getAllEmployee = async (req, res) => {
  try {
    const empleados = await Empleado.find().populate("departament")
    if (empleados.length === 0) {
      return res.status(404).json({ status: true, msg: "No hay empleados" });
    }
    res.status(200).json(empleados);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener empleados" });
  }
};

const getOneEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const empleado = await Empleado.findById(id).populate("Departamento");
    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al obtener empleado por su ID" });
  }
};

const createNewEmployee = async (req, res) => {
  try {
    const empleado = new Empleado(req.body);
    const resultado = await empleado.save();
    res.status(201).json(resultado);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al crear empleado" });
  }
};

const updateOneEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (empleadoActualizado) {
      res.status(200).json(empleadoActualizado);
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al actualizar empleado por su ID" });
  }
};

const deleteOneEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);
    if (empleadoEliminado) {
      res.status(200).json(empleadoEliminado);
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: "Error al eliminar empleado por su ID" });
  }
};

module.exports = {
  getAllEmployee,
  getOneEmployee,
  createNewEmployee,
  updateOneEmployee,
  deleteOneEmployee,
};
