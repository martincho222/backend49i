const User = require("../models/userSchema");
const { encryptPassword, comparePassword } = require("../utils/passwordHandler");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const sendEmail = require("../utils/emailHandler");

const getAllUsers = async (req, res) => {
const users = await User.find();
try {
    if(!users) {
        return res.status(404).json({
            mensaje:"Usuarios no encontrados",
            status: 404
        })
    }
    return res.status(200).json({
        mensaje: "Usuarios encontrados",
        status: 200,
        users
    })
} catch (error) {
    return res.status(500).json({
        mensaje: "Hubo un error, intentelo mas tarde",
        status: 500
    })
}
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id)

    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                mensaje: "Id invalido",
                status: 400
            })
        }
        if(!user) {
            return res.status(404).json({
                mensaje: "Usuario no encontrado",
                status: 404
            })
        }

        return res.status(200).json({
            mensaje: "Usuario encontrado",
            status: 200,
            user
        })

    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500        })
    }
}
const register = async (req, res) => {
    const { nombre, username, password } = req.body;
    const user = await User.findOne({username});
    try {
        if(user) {
            return res.status(400).json({
                mensaje: "El usuario ya existe",
                status: 400
            })
        }
       const newUser = new User({
        nombre,
        username,
        password: encryptPassword(password)
       });
       await newUser.save();
       sendEmail(newUser)
       res.status(201).json({
        mensaje: "Usuario creado exitosamente",
        status: 201,
        newUser
       })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({username});
    const secret = process.env.JWT_SECRET;

    try {
        if(!user){
            return res.status(404).json({
                mensaje:"Usuario no encontrado",
                status: 404
            })
        }
        if(!comparePassword(password, user.password)) {
            return res.status(400).json({
                mensaje: "La contraseña es incorrecta",
                status: 400
            })
        }

        const payload = {
            sub: user._id,
            email: user.username,
            nombre: user.nombre,
            rol: user.rol
        }
        const token = jwt.sign(payload, secret, {algorithm: process.env.JWT_ALGORITHM, expiresIn:"1h"});
        return res.status(200).json({
            mensaje: "Inicio de sesión exitoso",
            status: 200,
            token
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const changeToAdmin = async (req, res) => {
    const { id } = req.params;
    const { rol } = req.body;
    const user = await User.findById(id);
    try {
        if(!user) {
            return res.status(404).json({
                mensaje: "El usuario no existe",
                status: 404
            })
        }
        user.rol = rol;
        await user.save();
        res.status(200).json({
            mensaje: "Usuario actualizado correctamente",
            status: 200,
            user
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const deleteUser = async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);

    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                mensaje: "Id invalido",
                status: 400
            })
        }
        if(!user) {
            return res.status(404).json({
                mensaje:"Usuario no encontrado",
                status: 404
            })
        }
        return res.status(200).json({
            mensaje:"Usuario borrado correctamente",
            status: 200,
            user
        })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { nombre, username, password } = req.body;
    console.log(req.body);
    try {
        if(!mongoose.isValidObjectId(id)){
            return res.status(400).json({
                mensaje: "Id invalido",
                status: 400
            })
        }
      if(req.body.password){
        const user = await User.findByIdAndUpdate(id, {
            ...req.body,
            nombre,
            username,
            password: encryptPassword(password)
        }, {new: true} )
        if(!user) {
            return res.status(404).json({
                mensaje:"Usuario no encontrado",
                status: 404
            })
        }

        return res.status(200).json({
            mensaje: "Usuario modificado correctamente",
            status: 200,
            user
        })
      }
      const user = await User.findByIdAndUpdate(id, {
        ...req.body,
        nombre,
        username,
    }, {new: true} )
    if(!user) {
        return res.status(404).json({
            mensaje:"Usuario no encontrado",
            status: 404
        })
    }

    return res.status(200).json({
        mensaje: "Usuario modificado correctamente",
        status: 200,
        user
    })
    } catch (error) {
        return res.status(500).json({
            mensaje: "Hubo un error, intentelo mas tarde",
            status: 500
        })
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    register,
    changeToAdmin,
    deleteUser,
    login,
    updateUser
}