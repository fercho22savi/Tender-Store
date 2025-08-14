const mongoose = require('mongoose');
// Importar dotenv para manejar variables de entorno
require('dotenv').config();
// Conectar a la base de datos MongoDB
const UserSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Esto asegura que cada correo sea único
    },
    password: {
        type: String,
        required: true,
    },
    fechaRegistro: {
        type: Date,
        default: Date.now,
    },
    direccionEnvio: {
        calle: String,
        ciudad: String,
        codigoPostal: String,
        pais: String,
    }
});

module.exports = mongoose.model('User', UserSchema);