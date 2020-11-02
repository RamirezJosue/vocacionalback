const { Schema, model } = require('mongoose');

const PreguntaSchema = Schema({
    pregunta: { type: String, required: true},
    img: { type: String, required: true },
    public_id: { type: String },
    respuestas: [
        {
            rpta: { type: String },
            puntos: { type: Number },
            carrera: { type:  Schema.Types.ObjectId, ref: 'Carrera'}
        }
    ]
});

PreguntaSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
})
module.exports = model('Pregunta', PreguntaSchema)