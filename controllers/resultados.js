const { response } = require('express');
const Resultado = require('../models/resultado')



const cargarResultado = async(req, res = response) => {
    const id = req.param.id;
    try {
        const resultadoDB = await Resultado.findById(id)
                            .populate('usuario');
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


module.exports = {
    crearResultado,
    cargarResultado
}