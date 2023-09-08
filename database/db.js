const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
       await mongoose.connect(process.env.DB_CONNECTION, {
        dbName:"Comision49i",
        useNewUrlParser: true,
        useUnifiedTopology: true
       }) 
       console.log("Base de datos conectada")
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = dbConnection;