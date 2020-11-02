/*
    Resultados
    Ruta: /api/resultados
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { crearResultado, cargarResultado } = require('../controllers/resultados');
const { validarCampos } = require('../middlewares/validar-campos');

const { validarJWT } = require('../middlewares/validar-jwt');



const router = Router();

router.get('/',
    cargarResultado
);


router.post('/',
    crearResultado
);



module.exports = router;