const router = require("express").Router();
const {
  getAllEmployee,
  getOneEmployee,
  createNewEmployee,
  updateOneEmployee,
  deleteOneEmployee,
} = require("../../controllers/Empleado.Controller");

router.get("/", getAllEmployee);
router.get("/:id", getOneEmployee);
router.post("/", createNewEmployee);
router.patch("/:id", updateOneEmployee);
router.delete("/:id", deleteOneEmployee);

module.exports = router;
