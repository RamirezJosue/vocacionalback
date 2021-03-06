const { response } = require('express');
const { uploader } = require('../database/config');
const { dataUri } = require('../helpers/multer');
const Pregunta = require('../models/pregunta')

const cargarPreguntas = async(req, res = response) => {
    const { pageSize, page } = req.query;
    Number(pageSize) || 10;
    Number(page);
    try {
        const [ preguntas, total ] = await Promise.all([
            Pregunta
                .find({})
                .skip((page - 1) * pageSize )
                .limit( pageSize )
                .sort({_id: -1}),
            Pregunta.countDocuments({})
        ])
        res.json({
            ok: true,
            preguntas,
            total
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error revise los logs......'
        })
    }
}

const cargarTests = async(req, res = response) => {
    const pageSize = Number(req.query.pageSize) || 6;
    const page = Number(req.query.page);
    try {
        const [ preguntas, total ] = await Promise.all([
            Pregunta
                .find({})
                .skip((page - 1) * pageSize)
                .limit(pageSize),
            Pregunta.countDocuments({})
        ])
        res.json({
            ok: true,
            preguntas,
            total,
            pageSize
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado....'
        })
    }
}

const crearPregunta = async(req, res = response) => {
    // const file = dataUri(req).content;
    try {
        // const result = await uploader.upload(file, {
        //     folder: 'pregunta',
        //     use_filename: false,
        //     format: 'webp',
        //     eager: [
        //         { width: 250, height: 250, crop: 'pad' },
        //     ]
        // });

        const pregunta = new Pregunta(req.body);
        // pregunta.img = await result.eager[0].secure_url;
        // pregunta.public_id = await result.public_id;

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

const borrarPregunta = async (req, res= response) => {
    const id = req.params.id;
    try {
        const preguntaDB = await Pregunta.findById(id);
        if (!preguntaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una pregunta por ese id'
            })
        }
        await Pregunta.findByIdAndDelete(id);
        res.json({
            ok: true,
            msg: 'Pregunta eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const actualizarPregunta = async( req, res = response) => {
    const id = req.params.id;
    const  { pregunta, carrera } = req.body; 
    try {
        const preguntaDB = await Pregunta.findById(id);
        if (!preguntaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una pregunta por ese id'
            })
        }
        // if (req.file) {
        //     const file = dataUri(req).content;
        //     const result = await uploader.upload(file, {
        //         folder: 'pregunta',
        //         use_filename: false,
        //         format: 'webp',
        //         eager: [
        //             { width: 250, height: 250, crop: 'pad' },
        //         ]
        //     });
        //     preguntaDB.pregunta = req.body.pregunta;
        //     preguntaDB.img = await result.eager[0].secure_url;
        //     preguntaDB.public_id = await result.public_id;
        //     preguntaDB.save();
        // } else {
        //     preguntaDB.pregunta = req.body.pregunta;
        //     preguntaDB.save();
        // }
        preguntaDB.pregunta = pregunta;
        preguntaDB.carrera = carrera;
        preguntaDB.save();
        res.json({
            ok: true,
            descripcion: preguntaDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}





/**
 * CRUD RESPUESTA
 */
const crearRespuesta = async(req, res) => {
    const id = req.params.id;
    const { rpta, puntos } = req.body;
    try {
        const pregunta = await Pregunta.findById(id);
        pregunta.respuestas.push({
            rpta,
            puntos
        });
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

const actualizarRespuesta = async(req, res= response) => {
    const { pid, rid } = req.params;
    const { rpta, puntos } = req.body;
    try {

        const preguntaDB = await Pregunta.findById(pid);
        if (!preguntaDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una descripcion por ese id'
            })
        }

        const respuesta = await Pregunta.findOneAndUpdate(
            { _id: pid, 'respuestas._id': rid },
            { $set: 
                { 
                    'respuestas.$.rpta': rpta,
                    'respuestas.$.puntos': puntos
                }, 
            },
            {new: true}   
        )

        res.json({
            ok: true,
            respuesta
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}


const borrarRespuesta = async( req, res = response ) => {
    const {pid, rid} = req.params;
    try {
        await Pregunta.findByIdAndUpdate(pid, { $pull: { "respuestas": { _id: rid } } }, { safe: true, upsert: true });
        res.json({
            ok: true,
            msg: 'Respuestas eliminada eliminado'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}




module.exports = {
    crearPregunta,
    cargarPreguntas,
    actualizarPregunta,
    borrarPregunta,
    crearRespuesta,
    actualizarRespuesta,
    borrarRespuesta,
    cargarTests
}