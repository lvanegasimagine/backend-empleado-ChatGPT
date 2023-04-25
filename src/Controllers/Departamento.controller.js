const mongoose = require("mongoose");
const Departamento = require("../Models/Departamento.model");
const Empleado = require("../Models/Empleado.model");
const isValidId = require("../utils/idValidator");

const createDepartament = async (req, res) => {
  const departamento = new Departamento(req.body);
  try {
    await departamento.save();
    res.status(201).json(departamento);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al crear el departamento");
  }
};

const getAllDepartament = async (req, res) => {
  try {
    const departamentos = await Departamento.find();

    if (departamentos.length === 0) {
      return res
        .status(404)
        .json({ status: true, msg: "No hay departamentos" });
    }
    res.json(departamentos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los departamentos");
  }
};

const getAllDepartamentWithEmployee = async (req, res) => {
  try {
    const departamentos = await Departamento.find().populate("employees");
    res.json(departamentos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los departamentos");
  }
};

const getOneDepartament = async (req, res) => {
  if (!isValidId(req.params.id)) {
    res.status(417).send("El Id no es valido");
  }

  try {
    const departamentos = await Departamento.findById({
      _id: req.params.id,
    });

    if (!departamentos) {
      return res
        .status(404)
        .json({ status: true, msg: "El departamento no existe" });
    }
    res.json(departamentos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los departamentos");
  }
};

const getOneDepartamentWithEmployee = async (req, res) => {
  if (!isValidId(req.params.id)) {
    res.status(417).send("El Id no es valido");
  }

  try {
    const departamentos = await Departamento.findById({
      _id: req.params.id,
    }).populate("employees");

    if (!departamentos) {
      return res
        .status(404)
        .json({ status: true, msg: "El departamento no existe" });
    }
    res.json(departamentos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al obtener los departamentos");
  }
};

const updateDepartamento = async (req, res) => {
  const { id } = req.params;
  const { name, description, employees } = req.body;

  // Validar ID de departamento
  if (!isValidId(id)) {
    return res
      .status(400)
      .json({ mensaje: "El ID de departamento proporcionado no es válido." });
  }

  // Buscar departamento por ID y verificar si existen empleados asociados a él
  const departamento = await Departamento.findById(id).populate("employees");

  if (!departamento) {
    return res.status(404).json({ mensaje: "No se encontró el departamento." });
  }

  const empleadosActuales = departamento.employees.map(
    (empleado) => empleado.id
  );

  const nuevosEmpleados = employees
    ? employees.filter((idEmpleado) => !empleadosActuales.includes(idEmpleado))
    : [];

  // Verificar que no se estén repitiendo empleados
  if (nuevosEmpleados.length > 0) {
    const empleadosRepetidos = await Departamento.findOne({
      employees: { $in: employees },
    });

    if (empleadosRepetidos) {
      return res.status(400).json({
        error: "Uno o más empleados ya están asociados a otro departamento.",
      });
    }
  }

  // Actualizar name y descripción del departamento
  departamento.name = name || departamento.name;
  departamento.description = description || departamento.description;

  // Agregar nuevos empleados al departamento
  if (nuevosEmpleados.length > 0) {
    const nuevosEmpleadosSinRepetir = [
      ...new Set([...departamento.employees, ...nuevosEmpleados]),
    ];
    departamento.employees = nuevosEmpleadosSinRepetir;
  }

  try {
    await departamento.save();
    res.json({
      mensaje: "Departamento actualizado exitosamente.",
      departamento,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ mensaje: "Ocurrió un error al actualizar el departamento." });
  }
};

const deleteDepartament = async (req, res) => {
  if (!isValidId(req.params.id)) {
    res.status(417).send("El Id no es valido");
  }

  try {
    const departamento = await Departamento.findById(req.params.id);

    if (!departamento) {
      return res.status(404).json({ msg: "Departamento no encontrado" });
    }

    await Departamento.findOneAndRemove({ _id: req.params.id });

    res.json({ msg: "Departamento eliminado" });
  } catch (error) {
    res.status(500).send("Hubo un error al eliminar el departamento");
  }
};

const deleteEmployeesFromDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { employees } = req.body;

    // Verificar que el id proporcionado es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ message: "El ID proporcionado es inválido" });
    }

    // Verificar que los empleados proporcionados son un array
    if (!Array.isArray(employees)) {
      return res
        .status(400)
        .json({ message: "El valor de employees debe ser un array" });
    }

    const departamento = await Departamento.findById(id);

    if (!departamento) {
      return res.status(404).json({ message: "Departamento no encontrado" });
    }

    if (departamento.employees.length === 0) {
      return res.status(404).json({ error: "No Hay empleados que eliminar" });
    }

    if (employees.length === 1) {
      const empleadoId = req.body.employees[0]._id;

      const index = departamento.employees.indexOf(empleadoId);

      if (index === -1) {
        return res
          .status(404)
          .json({ error: "El empleado no está asociado a este departamento" });
      }

      departamento.employees.splice(index, 1);

      await departamento.save();

      return res
        .status(200)
        .json({ mensaje: "Empleado eliminado del departamento correctamente" });
    } else {
      const empleadosAEliminar = departamento.employees.map((empleado) => ({
        _id: empleado._id,
      }));

      // Actualizamos la colección de departamentos
      await Departamento.findByIdAndUpdate(
        req.params.id,
        { $pull: { employees: { $in: empleadosAEliminar } } },
        { new: true }
      );

      return res.status(200).json({
        message: "Empleados eliminados del departamento correctamente",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = {
  getAllDepartament,
  getAllDepartamentWithEmployee,
  getOneDepartament,
  getOneDepartamentWithEmployee,
  createDepartament,
  updateDepartamento,
  deleteDepartament,
  deleteEmployeesFromDepartment,
};
