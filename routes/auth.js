/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { login, renewToken, cambiarPassword} = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password es obligatorio').not().isEmpty(),
        validarCampos
    ],
    login
)

router.post('/change',
    [
        validarJWT,
        check('password','El password es obligatorio').not().isEmpty(),
        check('newpassword','El password actual es obligatorio').not().isEmpty(),
        validarCampos
    ],
    cambiarPassword
)
router.get('/renew',
    validarJWT,
    renewToken
)


module.exports = router;