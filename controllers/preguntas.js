const { response } = require('express');
const { uploader } = require('../database/config');
const { dataUri } = require('../helpers/multer');
const Pregunta = require('../models/pregunta')

const cargarPreguntas = async(req, res = response) => {
    try {
        const preguntas = await Pregunta.find();
        res.json({
            ok: true,
            preguntas
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const crearPregunta = async(req, res = response) => {
    const file = dataUri(req).content;
    try {
        const result = await uploader.upload(file, {
            folder: 'pregunta',
            use_filename: false,
            format: 'webp',
            eager: [
                { width: 250, height: 250, crop: 'pad' },
            ]
        });

        const pregunta = new Pregunta(req.body);
        pregunta.img = await result.eager[0].secure_url;
        pregunta.public_id = await result.public_id;

        // Guardar pregunta
        await pregunta.save();

        res.json({
            ok: true,
            pregunta
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revise logs'
        })
    }
}

const actualizarPregunta = async(req, res) => {
    const id = req.params.id;
    try {
        const pregunta = await Pregunta.findById(id);
        pregunta.respuestas.push(req.body);
        pregunta.save();
        res.json({
            ok: true,
            pregunta
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: true,
            msg: "Hable con el administrador"
        })
    }
}


module.exports = {
    crearPregunta,
    cargarPreguntas,
    actualizarPregunta
}