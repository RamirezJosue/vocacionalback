const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const {sendEmail} = require('../helpers/email');

const getUsuario = async (req, res) => {
    const usuarios = await Usuario.find();
    res.json({
        ok: true,
        usuarios,
        // uid: req.uid
    })
}

const crearUsuario = async(req, res = response) => {
    const {email, nombres, celular, colegio, localidad } = req.body;
    try {
        const existeEmail = await Usuario.findOne({ email });
        // Si el email estaba registrado simplemente la data se remplaza
        if (existeEmail) {
            existeEmail.nombres = nombres;
            existeEmail.email = email;
            existeEmail.celular = celular;
            existeEmail.colegio = colegio;
            existeEmail.localidad = localidad;
            const usuario =  await existeEmail.save();
            return res.json({
                ok: true,
                usuario
            });
        }

        // Se crear nuevo usuario
        const usuario = new Usuario(req.body);
        
        // Guardar usuario
        await usuario.save();

        res.json({
            ok: true,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revise logs'
        })
    }


}

const actualizarUsuario = async ( req, res = response) => {
    // Todo: Validar token y comprobar si es el usuario correcto
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }
        // Actualizaciones
        const { password, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate( uid, campos, { new: true})
        res.json({
            ok: true,
            usuario: usuarioActualizado
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado'
        })
    }
}

const borrarUsuario = async (req, res= response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario por ese id'
            })
        }
        await Usuario.findByIdAndDelete(uid);
        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const pruebaEmail = async (req, res = response) => {
    const { email } = req.body;
    const confirmUrl = `https://www.vivasur.com.pe/confirm/ekjsfesfneskjfnejk`;
    try {
        await sendEmail({
            email,
            subject: 'hola desde gaaaaaaaa',
            confirmUrl,
            file: 'confirm-account'
        });

        res.json({
            ok: true
        })
    } catch (error) {
        console.log(error);
        res.json({
            ok: false,
            error
        })
    }
}


module.exports = {
    getUsuario,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario,
    pruebaEmail
}