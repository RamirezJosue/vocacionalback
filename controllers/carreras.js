const { response } = require('express');


const Carrera = require('../models/carrera');

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
            msg: 'Hable con el administrador'
        })
    }
}



module.exports = {
    crearCarrera
}