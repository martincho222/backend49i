const { createCategory, getAllCategories } = require("../controllers/categoriaController");
const { getAllCuorses, createCourse } = require("../controllers/cursoController");
const { getAllUsers, register, changeToAdmin, getUserById, deleteUser, login, updateUser } = require("../controllers/userController");

const router = require("express").Router();

//user routes
router.get("/user", getAllUsers)
router.get("/user/:id", getUserById)
router.delete("/user/:id", deleteUser)
router.put("/user/:id", updateUser)
router.put('/admin/:id', changeToAdmin)
router.post("/user/registrar", register)
router.post("/user/login", login)


//categorias routes
router.get("/categorias", getAllCategories)
router.post('/categoria', createCategory)

//cursos routes
router.get("/cursos", getAllCuorses)
router.post("/curso", createCourse)


module.exports = router;