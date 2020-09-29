/*
    Path: '/api/login'
*/
const { Router } = require('express');
const { hoydia, getFecha } = require('../controllers/fecha');


const router = Router();


router.get('/', getFecha );

router.post('/',
    hoydia
)



module.exports = router;