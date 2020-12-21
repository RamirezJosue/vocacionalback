const { response } = require('express');
const Resultado = require('../models/resultado');
const ObjectId = require('mongodb').ObjectID;
const Carrera = require('../models/carrera');


const cargarResultado = async(req, res = response) => {
    const id = req.params.id;
    try {
        // const resultadoDB = await Resultado.findById(id);
        const resultado = await Resultado.aggregate([
            {$match: { _id: ObjectId(id) }},
            {$unwind: "$carreras"}, 
            {$sort: {"carreras.puntaje": -1}}, 
            {$limit : 5 }
        ]);
        await Carrera.populate(resultado, {path: 'carreras.carrera' });
        res.json({
            ok: true,
            resultado        
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const crearResultado = async(req, res = response) => {
    const resultado = new Resultado({
        ...req.body
    });

    try {
        const resultadoDB = await resultado.save();
        res.json({
            ok: true,
            resultado: resultadoDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


const actualizarResultado = async( req, res = response) => {
    const id = req.params.id;
    const  { nombres, email, celular } = req.body; 
    try {
        const resultadoDB = await Resultado.findById(id);
        if (!resultadoDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe una pregunta por ese id'
            })
        }
        resultadoDB.nombres = nombres;
        resultadoDB.email = email;
        resultadoDB.celular = celular;
        resultadoDB.save();
        res.json({
            ok: true,
            resultado: resultadoDB
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
    crearResultado,
    cargarResultado,
    actualizarResultado
}