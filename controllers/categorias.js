const { response } = require('express');
const Categoria = require('../models/categoria')


const crearCategoria = async(req, res = response) => {
    const categoria = new Categoria({
        ...req.body
    });

    try {
        const categoriaDB = await categoria.save();
        res.json({
            ok: true,
            categoria: categoriaDB
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
    crearCategoria
}