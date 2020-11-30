/*
    Resultados
    Ruta: /api/resultados
*/
const { Router } = require('express');
const { crearResultado, cargarResultado, actualizarResultado } = require('../controllers/resultados');


const router = Router();


router.get('/:id',
    cargarResultado
);

// router.get('/',
//     cargarResultado
// );


router.post('/',
    crearResultado
);

router.put('/:id',
    actualizarResultado
);



module.exports = router;