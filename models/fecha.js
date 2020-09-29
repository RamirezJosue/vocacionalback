const { Schema, model } = require('mongoose');

const FechaSchema = Schema({
    start: {
        type: Date
    }
});

module.exports = model('Fecha', FechaSchema)