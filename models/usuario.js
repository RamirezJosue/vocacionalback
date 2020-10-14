const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    nombres: { 
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    celular: {
        type: String
    },
    colegio: {
        type: String
    },
    localidad: {
        type: String
    },
    fecha: {
        type: Date,
        default: Date.now()
    }
});

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, ...object } = this.toObject();
    object.uid = _id;
    return object;
})
module.exports = model('Usuario', UsuarioSchema)