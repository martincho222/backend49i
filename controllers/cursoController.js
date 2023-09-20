const Curso = require("../models/cursoSchema");
const cloudinary = require("cloudinary").v2;

const getAllCuorses = async (req, res) => {
    const cursos = await Curso.find().populate("categoria");

    try {
        if(!cursos){
            return res.status(404).json({
                mensaje: "Cursos no encontradas"
            })
        }
        return res.status(200).json({
            mensaje:"Cursos encontradas",
            status: 200,
            cursos
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const getCourseById = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findById(id)
    try {
        if(!curso){
            return res.status(404).json({
                mensaje: "Curso no encontrado",
                status: 404
            })
        }

        return res.status(200).json({
            mensahe: " curso encontrado",
            status: 200,
            curso
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const createCourse = async (req, res) => {
    const { title, detalle, video, mentor, img_mentor, categoria} = req.body;
    const { path } = req.file;
    const curso = await Curso.findOne({ title });
    const cloudImg = await cloudinary.uploader.upload(path);

    try {
        if(curso) {
            return res.status(400).json({
                mensaje: "curso ya existe"
            })
        }
        const newCurso = new Curso({
            title,
            imagen: cloudImg.secure_url,
            detalle,
            video,
            mentor,
            img_mentor,
            categoria
        })
        await newCurso.save();

        return res.status(201).json({
            mensaje: "Curso creado correctamente",
            status: 201,
            newCurso
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const deleteCourse = async (req, res) => {
    const { id } = req.params;
    const curso = await Curso.findByIdAndDelete(id);

    try {
        if(!curso) {
            return res.status(404).json({
                mensaje: "Curso no encontrado",
                status: 404
            })
        }

        return res.status(200).json({
            mensaje: "Curso eliminado correctamente",
            status: 200,
            curso
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500,
            error
        })
    }
}

const updateCourse = async (req, res) => {
    const { id } = req.params;
    const { title, imagen, detalle, video, mentor, img_mentor, categoria } = req.body;

    try {
        const curso = await Curso.findByIdAndUpdate(id, req.body, {new: true});
        if(!curso) {
            return res.status(404).json({
                mensaje: "Curso no encontrado",
                status: 404
            })
        }
        return res.status(200).json({
            mensaje: "Curso modificado correctamente",
            status: 200,
            curso
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500,
            error
        })
    }
}

module.exports = {
    getAllCuorses,
    getCourseById,
    createCourse,
    deleteCourse,
    updateCourse
}