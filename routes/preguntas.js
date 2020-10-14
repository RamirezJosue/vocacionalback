/*
    Path: '/api/preguntas'
*/
const { Router } = require('express');
const { cargarPreguntas, crearPregunta, actualizarPregunta } = require('../controllers/preguntas');
const { multerUploads } = require('../helpers/multer');


const router = Router();


router.get('/',cargarPreguntas)

router.post('/',
    multerUploads,
    crearPregunta
)

router.put('/:id',
    actualizarPregunta
)



module.exports = router;