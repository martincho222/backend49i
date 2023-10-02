const nodemailer = require("nodemailer");
const template = require("./tamplate");


const sendEmail = async (newUser) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
            user: "martin.jerez.leal@gmail.com",
            // pass:"nknf kjll ayic yops"
            pass: "nknfkjllayicyops"
        }
    })
    const response = await transporter.sendMail(emailTemplate(newUser), (err, info) => {
        if (err) {
            console.log(err)
        } else {
            console.log(info)
        }
    })
    return response;
}

const emailTemplate = (newUser) => {

    return {
        from: "martin.jerez.leal@gmail.com",
        to: newUser.username,
        subject: "Registro Exitoso.",
        // text: `Usuario registrado correctamente con el email ${newUser.username}`
        html: template(newUser)
    }
}

module.exports = sendEmail