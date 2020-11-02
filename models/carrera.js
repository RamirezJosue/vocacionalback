const { Schema, model } = require('mongoose');

const CarreraSchema = Schema({
    nombre: { type: String, required: false}
});

module.exports = model('Carrera', CarreraSchema)