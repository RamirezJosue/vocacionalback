const { Schema, model } = require('mongoose');


const CategoriaSchema = new Schema({
    nombre: { type: String, unique: true, uppercase: true },
    descripcion: { type: String },
    childs: [
        { nombre: { type: String, uppercase: true }, descripcion: { type: String }, }
    ]
});

CategoriaSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
})

module.exports = model( 'Categoria', CategoriaSchema );
