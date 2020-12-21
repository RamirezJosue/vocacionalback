const { response } = require('express');


const Carrera = require('../models/carrera');


const cargarCarreras = async(req, res = response) => {
    try {
        const carreras = await Carrera.find({})
        res.json({
            ok: true,
            carreras
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error revise los logs...'
        })
    }
}

const crearCarrera = async(req, res = response) => {
    const carrera = new Carrera({
        ...req.body
    });

    try {
        const carreraDB = await carrera.save();
        res.json({
            ok: true,
            carrera: carreraDB
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Error revise los logsss......'
        })
    }
}



module.exports = {
    crearCarrera,
    cargarCarreras
}