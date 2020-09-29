const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const login = async(req, res = response) => {
    const { email, password } = req.body;
    try {
        // Verificar email
        const usuarioDB = await Usuario.findOne({email});
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contasena no válida'
            })
        }

        // Generar el TOKEN - JWT
        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const renewToken = async(req, res = response) => {
    const uid = req.uid;
    // Generar el TOKEN - JWT
    const token = await generarJWT(uid);

    // Obtener el usuario por UID
    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        token,
        usuario
    });
}

/**
 * Cambiar password autenticado
 */
const cambiarPassword = async(req, res = response ) => {
    const { password, newpassword } = req.body;
    try {
        const usuarioDB = await Usuario.findById(req.uid);
        // Verificar password
        const validPassword = bcrypt.compareSync( password, usuarioDB.password );
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'El password actual es incorrecto'
            })
        }

        // Encriptar password
        const salt = bcrypt.genSaltSync();
        usuarioDB.password = bcrypt.hashSync(newpassword, salt);

        await usuarioDB.save();
        res.json({
            ok: true,
            usuario: usuarioDB
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revise logs'
        })
    }
}

module.exports = {
    login,
    renewToken,
    cambiarPassword
}