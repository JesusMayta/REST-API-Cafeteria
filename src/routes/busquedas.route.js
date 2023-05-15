const { Router } = require('express');
const { busquedas } = require('../controllers/busquedas.controller');

const router = Router();

router.get('/:coleccion/:termino', busquedas);

module.exports = router;