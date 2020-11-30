const { Schema, model } = require('mongoose');

const ResultadoSchema = Schema({
    nombres: { type: String, required: false},
    email: { type: String, required: false},
    celular: { type: String, required: false },
    carreras: [
        {
            carrera: { type:  Schema.Types.ObjectId, ref: 'Carrera'},
            puntaje: { type: Number, required: false},
        }
    ],
    date: { type: Date, default: Date.now()}
});

module.exports = model('Resultado', ResultadoSchema)