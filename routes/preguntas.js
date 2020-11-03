/*
    Path: '/api/preguntas'
*/
const { Router } = require('express');
const { 
    cargarPreguntas, 
    crearPregunta,
    crearRespuesta, 
    actualizarRespuesta, 
    borrarRespuesta,
    borrarPregunta,
    actualizarPregunta,
    cargarTests
} = require('../controllers/preguntas');
const { multerUploads } = require('../helpers/multer');


const router = Router();


router.get('/',cargarPreguntas)
router.get('/tests',cargarTests)

router.post('/',
    // multerUploads,
    crearPregunta
)

router.delete('/:id',
    borrarPregunta
)
router.put('/:id',
    // multerUploads,
    actualizarPregunta
)
/**
 * CRUD respuestas
 */

router.put('/respuesta/:id',
    crearRespuesta
)

router.put('/respuesta/:pid/:rid',
    actualizarRespuesta
)


router.delete('/respuesta/:pid/:rid',
    borrarRespuesta
)



module.exports = router;