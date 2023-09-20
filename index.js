require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const router = require("./routes")
const dbConnection = require("./database/db");
const cloudinary = require("cloudinary").v2;
const passport = require("passport");
const jwtStrategy = require("./passport/jwt");

const app = express();

//middlewares
app.use(cors())
app.options('*', cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))

//passport
passport.use("jwt", jwtStrategy)

//cloudinary config
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.APY_KEY, 
    api_secret: process.env.API_SECRET
  });

//configuracion rutas
app.use(process.env.API, router);
//puerto
const port = process.env.PORT;

//conexion base de datos
dbConnection();

app.listen(port, () => {
    console.log(`mi servidor esta funcionando en el puerto ${port}`);
})