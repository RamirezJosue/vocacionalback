const { Schema, model } = require('mongoose');

const CarreraSchema = Schema({
    nombre: { type: String, required: false},
    nombre_corto: { type: String, required: false, lowercase: true }
});

module.exports = model('Carrera', CarreraSchema)