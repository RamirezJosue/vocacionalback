/*
    Categorias
    Ruta: /api/categorias
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');

const {
    crearCategoria
} = require('../controllers/categorias')


const router = Router();

router.post('/',
    [
        check('nombre','El nombre del médico es necesario').not().isEmpty(),
        check('descripcion','El hospital id debe de ser válido').not().isEmpty(),
        validarCampos
    ],
    crearCategoria
);



module.exports = router;