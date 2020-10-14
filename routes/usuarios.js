/*
    Ruta: /api/usuarios
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getUsuario, crearUsuario, actualizarUsuario, borrarUsuario, pruebaEmail } = require('../controllers/usuarios');
const {validarJWT, validarADMIN_ROLE, varlidarADMIN_ROLE_o_MismoUsuario} = require('../middlewares/validar-jwt');


const router = Router();

router.get('/', validarJWT , getUsuario );
router.post(
    '/',
    [
        check('nombres','El nombre es obligatorio').not().isEmpty(),
        check('email','El email es obligatorio').isEmail(),
        validarCampos,
    ], 
    crearUsuario 
);

router.put('/:id',
    [
        validarJWT,
        varlidarADMIN_ROLE_o_MismoUsuario,
        check('email','El email es obligatorio').isEmail(),
        check('role','El role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuario
)

router.delete('/:id',
    [validarJWT, validarADMIN_ROLE],
    borrarUsuario,
);


router.post('/email',
    pruebaEmail
);

module.exports = router;