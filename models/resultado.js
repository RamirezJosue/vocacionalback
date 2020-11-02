const { Schema, model } = require('mongoose');

const ResultadoSchema = Schema({
    usuario: { type:  Schema.Types.ObjectId, ref: 'Usuario'},
    carreras: [
        {
            carrera: { type:  Schema.Types.ObjectId, ref: 'Carrera'},
            puntos: { type: String, required: false},
        }
    ]
});

module.exports = model('Resultado', ResultadoSchema)