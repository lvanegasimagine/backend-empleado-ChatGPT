const {
  getAllDepartament,
  getOneDepartament,
  createDepartament,
  updateDepartamento,
  deleteDepartament,
  getAllDepartamentWithEmployee,
  getOneDepartamentWithEmployee,
  deleteEmployeesFromDepartment
} = require("../../Controllers/Departamento.controller");

const router = require("express").Router();

router.get("/", getAllDepartament);
router.get("/withEmployee", getAllDepartamentWithEmployee);
router.get("/:id", getOneDepartament);
router.get("/withEmployee/:id", getOneDepartamentWithEmployee);
router.post("/", createDepartament);
router.patch("/:id", updateDepartamento);
router.delete("/:id", deleteDepartament);
router.delete("/withEmployee/:id", deleteEmployeesFromDepartment);

module.exports = router;
