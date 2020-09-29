const { response } = require('express');


const Fecha = require('../models/fecha');

const getFecha = async (req, res) => {
    const fechas = await Fecha.find();
    res.json({
        ok: true,
        fechas
    })
}

const hoydia = async(req, res = response) => {
    try {
        console.log(req.body);
        const fecha = new Fecha(req.body);
        await fecha.save();
        res.json({
            ok: true,
            fecha
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}


module.exports = {
    hoydia,
    getFecha
}