const { createCategory, getAllCategories } = require("../controllers/categoriaController");
const { getAllCuorses, createCourse, deleteCourse, updateCourse } = require("../controllers/cursoController");
const { getAllUsers, register, changeToAdmin, getUserById, deleteUser, login, updateUser } = require("../controllers/userController");
const authenticateAdmin = require("../middlewares/authAdmin");
const authenticateUser = require("../middlewares/authUser");
const upload = require("../middlewares/multer");


const router = require("express").Router();

//user routes
router.get("/user", authenticateAdmin, getAllUsers)
router.get("/user/:id", authenticateAdmin,getUserById)
router.delete("/user/:id", authenticateAdmin, deleteUser)
router.put("/user/:id", authenticateUser, updateUser)
router.put('/admin/:id', authenticateAdmin, changeToAdmin)
router.post("/user/registrar", register)
router.post("/user/login", login)


//categorias routes
router.get("/categorias", getAllCategories)
router.post('/categoria', authenticateAdmin, createCategory)

//cursos routes
router.get("/cursos", getAllCuorses)
router.post("/curso", authenticateAdmin, upload.single("imagen"), createCourse)
router.delete("/curso/:id", authenticateAdmin, deleteCourse)
router.put("/curso/:id", authenticateAdmin, updateCourse)


module.exports = router;