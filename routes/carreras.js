/*
    Carreras
    Ruta: /api/carreras
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearCarrera, cargarCarreras } = require('../controllers/carreras');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',
    cargarCarreras
);
router.post('/',
    crearCarrera
);



module.exports = router;